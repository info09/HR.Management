using Volo.Abp.Application.Dtos;

namespace HR.Management
{
    public class BaseListFilter : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
