using System;

namespace Shop.Extentions
{
    public static partial class DateTimeExtentions
    {
        public static DateTime ToWesternEuropeStandardTime(this DateTime dt)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(dt.ToUniversalTime(),
                TimeZoneInfo.FindSystemTimeZoneById("W. Europe Standard Time"));
        }
    }
}
