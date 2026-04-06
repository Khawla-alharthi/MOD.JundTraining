namespace MOD.Jund.Vegs;

public static class VegConsts
{
    private const string DefaultSorting = "{0}CreationTime desc";

    public static string GetDefaultSorting(bool withEntityName)
    {
        return string.Format(DefaultSorting, withEntityName ? "Veg." : string.Empty);
    }
}