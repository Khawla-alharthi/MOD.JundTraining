namespace MOD.Training.Fruits;

public static class FruitConsts
{
    private const string DefaultSorting = "{0}CreationTime desc";

    public static string GetDefaultSorting(bool withEntityName)
    {
        return string.Format(DefaultSorting, withEntityName ? "Fruit." : string.Empty);
    }
}