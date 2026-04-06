using MOD.Jund.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace MOD.Jund.Permissions;

public class JundPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(JundPermissions.GroupName);
        myGroup.AddPermission(JundPermissions.Dashboard.Host, L("Permission:Dashboard"), MultiTenancySides.Host);
        myGroup.AddPermission(JundPermissions.Dashboard.Tenant, L("Permission:Dashboard"), MultiTenancySides.Tenant);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(JundPermissions.MyPermission1, L("Permission:MyPermission1"));
        var vegPermission = myGroup.AddPermission(JundPermissions.Vegs.Default, L("Permission:Vegs"));
        vegPermission.AddChild(JundPermissions.Vegs.Create, L("Permission:Create"));
        vegPermission.AddChild(JundPermissions.Vegs.Edit, L("Permission:Edit"));
        vegPermission.AddChild(JundPermissions.Vegs.Delete, L("Permission:Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<JundResource>(name);
    }
}