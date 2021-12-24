using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Owner
    {
        public int OwnerID { get; set; }
        public string OwnerName { get; set; }
        public string OwnerPhotoName { get; set; }
        public string Car { get; set; }
        public string DateJoined { get; set; }
        public string OwnerPhoneNumber { get; set; }
        public int CarOwnedID { get; set; }
    }
}
