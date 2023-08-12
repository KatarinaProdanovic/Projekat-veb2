using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyBackend.Infrastructure;
using MyBackend.Mapping;
using MyBackend.Services;
using MyBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MyBackend.Configuration;
using MyBackend.Repository.Interfaces;
using MyBackend.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string _cors = "cors";


builder.Services.AddHttpClient();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection(nameof(MailSettings)));

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//Registracija mapera u kontejneru, zivotni vek singleton
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);
        
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISellerService, SellerService>();

//repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();



builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Seller", policy => policy.RequireClaim("Seller"));
    options.AddPolicy("Admin", policy => policy.RequireClaim("Admin"));
    options.AddPolicy("Customer", policy => policy.RequireClaim("Customer"));

    //Ovde mozemo kreirati pravilo za validaciju nekog naseg claima
});

builder.Services.AddAuthentication(opt => {
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
          .AddJwtBearer(options =>
          {
              options.TokenValidationParameters = new TokenValidationParameters //Podesavamo parametre za validaciju pristiglih tokena
              {
                  ValidateIssuer = true, //Validira izdavaoca tokena
                  ValidateAudience = false, //Kazemo da ne validira primaoce tokena
                  ValidateLifetime = true,//Validira trajanje tokena
                  ValidateIssuerSigningKey = true, //validira potpis token, ovo je jako vazno!
                  ValidIssuer = "http://localhost:7006", //odredjujemo koji server je validni izdavalac
                  IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["SecretKey"]))//navodimo privatni kljuc kojim su potpisani nasi tokeni
              };
          });
builder.Services.AddAuthentication().AddFacebook(facebookOptions =>
{
    facebookOptions.AppId = "252120644281035";
    facebookOptions.AppSecret = "c92c2e5a404473486e3506483b695d24";
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: _cors, builder => {
        builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(_cors);
app.UseRouting();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.Run();
