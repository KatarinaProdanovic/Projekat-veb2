﻿namespace MyBackend.Models
{
    public class User
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Adress { get; set; }
        public string Type { get; set; }
        public string Photo { get; set; }

    }
}