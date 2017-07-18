//
//  FacebookInterface.m
//  HotFixer
//
//  Created by 唐博文 on 2017/6/1.
//
//

#import "FacebookInterface.h"
#import "FaceBookManager.h"

@implementation FacebookInterface

+ (void)login:(NSString*)data
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:data];
    NSArray *permissions = [dict objectForKey:@"permissions"];
    [[FaceBookManager getInstance] loginWithPermissions:permissions handler:^(FBSDKLoginManagerLoginResult *result, NSError *error) {
        if (error != nil) { // 登录失败
            NSLog(@"登录失败:%@", error);
        } else if(result.isCancelled){
            NSLog(@"登录取消");
        } else { // 登录成功，向JavaScript发送事件
            FBSDKAccessToken * token = [[FaceBookManager getInstance] currentAccessToken];
            NSDictionary *dict = [FacebookInterface accessTokenToDictionary:token];
            [Utility emitJavaScriptEvent:@"event_fb_login_success" data:dict];
        }
    }];
}

+ (NSString*)isLogin:(NSString*)data
{
    BOOL login = [[FaceBookManager getInstance] isLogin];
    return login ? @"true" : @"false";
}

+ (void)invite:(NSString*)data
{
    [[FaceBookManager getInstance] invite:^(NSError *err, NSDictionary *results) {
        if(err != nil){
            NSLog(@"邀请失败:%@", err);
        } else if(results != nil){ // {"didComplete":1,"completionGesture":"cancel"}
            NSLog(@"邀请成功:%@", [Utility dictionaryToJSONString:results]);
        }
    }];
}

+ (void)share:(NSString*)data
{
    [[FaceBookManager getInstance] share:^(NSError *err, BOOL cancelled, NSDictionary *results) {
        if(err != nil){
            NSLog(@"分享失败:%@", err);
        } else if(cancelled){
            NSLog(@"取消分享");
        } else if(results != nil){
            NSLog(@"分享成功:%@", [Utility dictionaryToJSONString:results]);
        }
    }];
}

+ (NSString*)getAccessToken:(NSString*)data
{
    FBSDKAccessToken * token = [[FaceBookManager getInstance] currentAccessToken];
    NSDictionary *dict = [FacebookInterface accessTokenToDictionary:token];
    return [Utility dictionaryToJSONString:dict];
}

+ (NSDictionary*)accessTokenToDictionary:(FBSDKAccessToken*)t
{
    if(!t){
        return nil;
    }
    NSTimeInterval ie = [t.expirationDate timeIntervalSince1970];
    long long expires = ie * 1000 ;
    NSTimeInterval ir = [t.refreshDate timeIntervalSince1970];
    long long refresh = ir * 1000 ;
    NSArray *permissions = [t.permissions allObjects];
    NSArray *declinedPermissions = [t.declinedPermissions allObjects];
    NSDictionary *dict = @{
                           @"token": t.tokenString,
                           @"expirationDate": [NSNumber numberWithLong:expires],
                           @"permissions": permissions,
                           @"declinedPermissions": declinedPermissions,
                           @"refreshDate": [NSNumber numberWithLong:refresh],
                           @"appID": t.appID,
                           @"userID": t.userID
                           };
    return dict;
}

@end
