using AutoMapper;
using MyBackend.DTO;
using MyBackend.Models;

namespace MyBackend.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap(); //Kazemo mu da mapira Subject na SubjectDto i obrnuto
            CreateMap<User, LoginDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UpdateDto>().ReverseMap();
            CreateMap<User, EditProfileDto>().ReverseMap();
            CreateMap<User, EditProfileDto>().ReverseMap();
        }
    }
}

