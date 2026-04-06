using Volo.Abp.Reflection;

namespace MOD.Training.Permissions;

public class TrainingPermissions
{
    public const string GroupName = "Training";

    public static string[] GetAll()
    {
        return ReflectionHelper.GetPublicConstantsRecursively(typeof(TrainingPermissions));
    }

    public static class Fruits
    {
        public const string Default = GroupName + ".Fruits";
        public const string Edit = Default + ".Edit";
        public const string Create = Default + ".Create";
        public const string Delete = Default + ".Delete";
    }
}