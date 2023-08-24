using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyBackend.DTO;
using MyBackend.Infrastructure;
using MyBackend.Models;
using MyBackend.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;

using System.Net;
using System.Security.Claims;
using System.Text;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Org.BouncyCastle.Crypto.Macs;
using System;
using System.Net.Mail;
using MyBackend.Repository.Interfaces;

namespace MyBackend.Services
{
    public class SellerService : ISellerService
    {

        private readonly IMapper _mapper;
      
        private readonly IConfigurationSection _secretKey;
        private readonly IUserRepository _userRepository;

        public SellerService(IMapper mapper,IConfiguration config, IUserRepository userRepository)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _userRepository = userRepository;

        }
        public string crypto(string password)
        {

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            return passwordHash;
        }
       
        public void DeleteCustomers(long id)
        {
            throw new NotImplementedException();
        }

        public UserDto GetById(long id)
        {
            throw new NotImplementedException();
        }

        public List<UserDto> GetSellers()
        {
            return _mapper.Map<List<UserDto>>(_userRepository.GetSellerForStatusS());
        }




        public static void SendEmail(string username, string password, string recipientEmail, string subject, string body)
        {
            var fromEmail = "draganaprodanovic00@gmail.com"; // Unesite vašu email adresu ovde
            var smtpHost = "smtp.elasticemail.com"; // Postavite SMTP server za ElasticEmail
            var smtpPort = 2525; // Port za ElasticEmail SMTP server

            using (var client = new System.Net.Mail.SmtpClient(smtpHost, smtpPort))
            {
                client.UseDefaultCredentials = false;
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(username, password);

                using (var message = new MailMessage())
                {
                    message.From = new MailAddress(fromEmail);
                    message.To.Add(new MailAddress(recipientEmail));
                    message.Subject = subject;
                    message.Body = body;
                    message.IsBodyHtml = true;

                    try
                    {
                        client.Send(message);
                        Console.WriteLine("Email sent successfully!");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Failed to send email. Error message: " + ex.Message);
                    }
                }
            }
        }

        public UserDto UpdateSellers([FromBody] UpdateDto newUserData)
        {
            User seller = _userRepository.GetById(newUserData.Id);
            if (seller != null)
            {
                seller.isVerified = 0;

                var vr = newUserData.IsVerified;
                var recipientEmail ="test@yopmail.com";
                var subject = "Status of verification";
                var bodyHtml = $"<h1>Hello, your status of verification is</h1><p>{vr}</p>";
                SendEmail("draganaprodanovic00@gmail.com", "9C62962B146C0BFEA22247C6919D19E64A18", recipientEmail, subject, bodyHtml);

            }

            _userRepository.saveChanges();


           


            return _mapper.Map<UserDto>(seller);
        } 

        public string GetStatus(string mail)
        {
            List<User> sellers = new List<User>();

            sellers = _userRepository.GetAllUsers();
            if (sellers.Count == 0)
            {
                return null;
            }
            User customer = sellers.First(x => x.Email == mail);

            if (customer == null) { return null; }
            return customer.isVerified.ToString();


        }
     


        public EditProfileDto GetProfile([FromBody] EditProfileDto newUserData)
        {

            List<User> customers = new List<User>();
            customers = _userRepository.GetAllUsers();
            if (customers.Count == 0)
            {
                return null;
            }
            User customer = customers.First(x => x.Email == newUserData.Email);
            return _mapper.Map<EditProfileDto>(customer);
        }
       

    }
}
