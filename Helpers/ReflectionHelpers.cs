using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace Shop.Helpers
{
    public static partial class ReflectionHelpers
    {
        public static object GetPropertyValue(this object obj, string propertyName)
        {
            return obj.GetType().GetProperty(propertyName).GetValue(obj, null);
        }

        public static List<Expression<Func<object, bool>>> ToWhereExpression(this object obj)
        {
            return new List<Expression<Func<object, bool>>>();
        }

        public static string FirstCharToUpper(this string input)
        {
            return input.First().ToString().ToUpper() + input.Substring(1);
        }
    }
}
