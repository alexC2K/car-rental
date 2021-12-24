using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Car
    {
        public int CarID { get; set; }
        public string CarName { get; set; }
        public int CarKM { get; set; }
        public int CarYear { get; set; }
        public string CarImage { get; set; }
        public int CarRented { get; set; }
    }
}
