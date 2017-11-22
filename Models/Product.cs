using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Shop.Extentions;

namespace Shop.Models
{
    public class Product
    {
        private DateTime? _createdAt;

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int CompanyId { get; set; }

        [ForeignKey("CompanyId")]
        public virtual Company Company { get; set; }

        public int? CreatedById { get; set; }

        [ForeignKey("CreatedById")]
        public virtual User CreatedBy { get; set; }

        public int? UpdatedById { get; set; }

        [ForeignKey("UpdatedById")]
        public virtual User UpdatedBy { get; set; }

        public DateTime? CreatedAt
        {
            get => _createdAt?.ToWesternEuropeStandardTime();
            set => _createdAt = value?.ToUniversalTime();
        }
    }
}
