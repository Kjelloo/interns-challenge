using RestSharp;
using RestSharp.Serializers.NewtonsoftJson;

namespace HolidayCalendar;
public class HolidayCalendar : IHolidayCalendar
{
  private RestClient _client;
  public HolidayCalendar()
  {
    _client = new RestClient("https://api.sallinggrou.com/v1/holidays/",
      configureSerialization: s => s.UseNewtonsoftJson());

    // todo: fetch token from secure storage
    _client.AddDefaultHeader("Authorization", "Bearer -token-");
  }
  
  public bool IsHoliday(DateTime date)
  {
    try
    {
      var request = new RestRequest($"is-holiday?date={date:yyyy-MM-dd}");

      var response = _client.Get<bool>(request);
    
      return response;
    }
    catch (Exception e)
    {
      Console.WriteLine("An error occured: " + e.Message);
      throw;
    }
  }

  public ICollection<DateTime> GetHolidays(DateTime startDate, DateTime endDate)
  {
    try
    {
      var request = new RestRequest($"?startDate={startDate:yyyy-MM-dd}" +
                                    $"&endDate={endDate:yyyy-MM-dd}");
    
      var response = _client.Get<ICollection<Holiday>>(request);
    
      if (response == null) return new List<DateTime>();
    
      var result = response
        .Where(d => d.NationalHoliday)
        .Select(d => d.Date).ToList();
    
      return result;
    }
    catch (Exception e)
    {
      Console.WriteLine("An error occurred: " + e.Message);
      throw;
    }
  }
}
