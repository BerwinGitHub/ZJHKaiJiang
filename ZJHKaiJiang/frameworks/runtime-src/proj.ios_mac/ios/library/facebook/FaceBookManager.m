//
//  FaceBookManager.m
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import "FaceBookManager.h"
#import "ConfigManager.h"

@implementation FaceBookManager

static FaceBookManager *_instance = nil;

+ (instancetype)getInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[self alloc] init];
    });
    
    return _instance;
}

+ (void)pure
{
    if(_instance){
        [_instance release];
        _instance = nil;
    }
}

#pragma mark - override
- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    [super setUpEnvironment:viewController withDebug:debug];
    NSString *appID = [[ConfigManager getInstance] getFacebookIdByKey:kConfigFBAppId];
    [FBSDKAppEvents setLoggingOverrideAppID:appID];
    return YES;
}

#pragma mark - method
- (void)loginWithPermissions:(NSArray*)permissions handler:(FBSDKLoginManagerRequestTokenHandler)handler
{
    if(self.viewController == nil){
        NSLog(@"_viewController is nil. Please setViewController()");
        return;
    }
    // 打开 FBSDKProfile 自动追踪 FBSDKAccessToken
    [FBSDKProfile enableUpdatesOnAccessTokenChange:YES];
    // 清空FBSDKAccessToken
    [FBSDKAccessToken setCurrentAccessToken:nil];
    
    FBSDKLoginManager *loginManager = [[FBSDKLoginManager alloc] init];
    [loginManager setDefaultAudience:[loginManager defaultAudience]];
    // 默认打开方式是应用
    [loginManager setLoginBehavior:FBSDKLoginBehaviorNative];
    [loginManager logInWithReadPermissions:permissions
                        fromViewController:self.viewController
                                   handler:handler];
    
    // 添加Facebook的广播监听
    /*
    [[NSNotificationCenter defaultCenter] addObserverForName:FBSDKProfileDidChangeNotification
                                                      object:nil
                                                       queue:nil
                                                  usingBlock:^(NSNotification * _Nonnull note) {
                                                      FBSDKAccessToken *token = [self isLogin];
                                                      if(token){
                                                          NSLog(@"userID:%@", token.userID);
                                                          NSLog(@"tokenString:%@", token.tokenString);
                                                          NSLog(@"appID:%@", token.appID);
                                                          NSLog(@"permissions:%@", token.permissions);
                                                      }
                                                  }];*/
}

- (BOOL)isLogin
{
    return [FBSDKAccessToken currentAccessToken];
}

- (void)logEvent:(NSString*)eventName withParameters:(NSDictionary*)params
{
    [FBSDKAppEvents logEvent:eventName parameters:params];
}

- (void)logEvent:(NSString*)eventName valueToSum:(double)sum
{
    [FBSDKAppEvents logEvent:eventName valueToSum:sum];
}

- (void)logEvent:(NSString*)eventName
{
    [FBSDKAppEvents logEvent:eventName];
}

- (FBSDKAccessToken*)currentAccessToken
{
    return [FBSDKAccessToken currentAccessToken];
}

- (void)graphRequest:(NSString*)graphPath parameters:(NSDictionary *)parameters handler:(FBSDKGraphRequestHandler)handler httpMethod:(NSString*)method;
{
    if([self isLogin]){
        // [[[FBSDKGraphRequest alloc] initWithGraphPath:@"me/friendlists" parameters:parameters HTTPMethod:@"GET"] startWithCompletionHandler:handler];
        /* // 请求好友的回调block表达式
        ^(FBSDKGraphRequestConnection *connection, id result, NSError *err) {
            if (err) {
                NSLog(@"请求好友失败:%@", err);
            }
            NSLog(@"请求好友成功:%@", result);
        }*/
        
        // This will only return the list of friends who have this app installed
        FBSDKGraphRequest *friendsRequest = [[FBSDKGraphRequest alloc] initWithGraphPath:graphPath
                                                                              parameters:parameters
                                                                              HTTPMethod:method];
        FBSDKGraphRequestConnection *connection = [[FBSDKGraphRequestConnection alloc] init];
        [connection addRequest:friendsRequest
             completionHandler:handler];
        // start the actual request
        [connection start];
    }
}

- (FBSDKProfile*)getCurrentProile
{
    return [FBSDKProfile currentProfile];
}

- (void)invite:(FBInviteComplete) delegate
{
    NSString *appUrl = [[ConfigManager getInstance] getFacebookIdByKey:kConfigFBInviteAppUrl];
    NSString *imgUrl = [[ConfigManager getInstance] getFacebookIdByKey:kConfigFBInviteImageUrl];
    NSString *promotTxt = [[ConfigManager getInstance] getFacebookIdByKey:kConfigFBInvitePromotText];
    NSString *promotCode = [[ConfigManager getInstance] getFacebookIdByKey:kConfigFBInvitePromotCode];
    [self setInviteComplete:delegate];
    FBSDKAppInviteContent *content = [[FBSDKAppInviteContent alloc] init];
    [content setDestination: FBSDKAppInviteDestinationFacebook]; // 邀请是Facebook || Messager
    if(![appUrl isEqualToString:@""]){
        NSLog(@"appUrl:%@", appUrl);
        content.appLinkURL = [NSURL URLWithString:appUrl];
    }
    if(![promotTxt isEqualToString:@""]){ // 和应用内优惠信息有关
        [content setPromotionText:promotTxt];
    }
    if(![promotCode isEqualToString:@""]){ // 和应用内优惠信息有关
        [content setPromotionCode:promotCode];
    }
    if(![imgUrl isEqualToString:@""]){
        [content setAppInvitePreviewImageURL:[NSURL URLWithString:imgUrl]];
    }
    [FBSDKAppInviteDialog showFromViewController:self.viewController withContent:content delegate:self];
}

- (void)share:(FBShareComplete)delegate
{
    [self setShareComplete:delegate];
    NSString *appUrl = [[ConfigManager getInstance] getFacebookIdByKey:kConfigFBShareAppUrl];
    
    FBSDKShareLinkContent *content = [[FBSDKShareLinkContent alloc] init];
    content.contentURL = [NSURL URLWithString:appUrl];
//    UIImage* image = [[UIImage alloc] initWithContentsOfFile:@"res/HelloWorld.png"];
//    FBSDKSharePhoto *photo = [[FBSDKSharePhoto alloc] init];
//    photo.image = image;
//    photo.userGenerated = YES;
//    FBSDKSharePhotoContent *pContent = [[FBSDKSharePhotoContent alloc] init];
//    pContent.photos = @[photo];
//    
//    FBSDKShareMediaContent *media = [[FBSDKShareMediaContent alloc] init];
//    media.media = @[content];
    [FBSDKShareDialog showFromViewController:self.viewController withContent:content delegate:self];
}

#pragma -mark delegate
- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didCompleteWithResults:(NSDictionary *)results
{
    if(self.inviteComplete != nil){
        self.inviteComplete(nil, results);
    }
}

- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didFailWithError:(NSError *)error
{
    if(self.inviteComplete != nil){
        self.inviteComplete(error, nil);
    }
}

- (void)sharer:(id<FBSDKSharing>)sharer didCompleteWithResults:(NSDictionary *)results
{
    if(self.shareComplete != nil){
        self.shareComplete(nil, NO, results);
    }
}

- (void)sharer:(id<FBSDKSharing>)sharer didFailWithError:(NSError *)error
{
    if(self.shareComplete != nil){
        self.shareComplete(error, NO, nil);
    }
}

- (void)sharerDidCancel:(id<FBSDKSharing>)sharer
{
    if(self.shareComplete != nil){
        self.shareComplete(nil, YES, nil);
    }
}

@end
