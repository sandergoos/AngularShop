namespace Shop.Filters
{
    public class ProductFilter
    {
        public ProductFilter()
        {
            // Defaulting to false and Id
            Desc = false;
            OrderBy = "Id";
        }

        public string Name { get; set; }

        public decimal PriceFrom { get; set; }

        public decimal PriceTill { get; set; }

        public string OrderBy { get; set; }

        public bool Desc { get; set; }
    }
}
