using MOD.Training.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace MOD.Training.Permissions;

public class TrainingPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(TrainingPermissions.GroupName, L("Permission:Training"));
        var fruitPermission = myGroup.AddPermission(TrainingPermissions.Fruits.Default, L("Permission:Fruits"));
        fruitPermission.AddChild(TrainingPermissions.Fruits.Create, L("Permission:Create"));
        fruitPermission.AddChild(TrainingPermissions.Fruits.Edit, L("Permission:Edit"));
        fruitPermission.AddChild(TrainingPermissions.Fruits.Delete, L("Permission:Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<TrainingResource>(name);
    }
}