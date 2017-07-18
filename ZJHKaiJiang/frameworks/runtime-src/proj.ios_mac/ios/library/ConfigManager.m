//
//  ConfigManager.m
//  HotFixer
//
//  Created by 唐博文 on 2017/5/30.
//
//

#import "ConfigManager.h"
#import "NativeManager.h"
#if __ENABLE_FACEBOOK__
#import "FaceBookManager.h"
#endif
#if __ENABLE_AD__
#import "AdsManager.h"
#endif
#if __ENABLE_FLURRY
#import "FlurryManager.h"
#endif
#if __ENABLE_PURCHASE
#import "IAPurchaseManager.h"
#endif

@implementation ConfigManager

static ConfigManager *_instance = nil;

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
- (BOOL)setUpEnvironment:(UIViewController*)viewController withConfigs:(NSString*)configs withDebug:(BOOL)debug
{
    // 解析configs数据
    self.configsDict = [Utility dictionaryWithJSONString:configs];
    [super setUpEnvironment:viewController withDebug:[[self.configsDict objectForKey:kConfigDebug] boolValue]];
    
    if(self.debug) {
        NSLog(@"kConfigAppleAppId:%@",[self getAppleIdByKey:kConfigAppleAppId]);
        NSLog(@"kConfigAppleAppUrl:%@",[self getAppleIdByKey:kConfigAppleAppUrl]);
        NSLog(@"getPrivacyUrl:%@",[self getPrivacyUrl]);
        NSLog(@"kConfigAdmobAppId:%@",[self getAdmobIdByKey:kConfigAdmobAppId]);
        NSLog(@"kConfigAdmobBannerId:%@",[self getAdmobIdByKey:kConfigAdmobBannerId]);
        NSLog(@"kConfigAdmobInterstitialId:%@",[self getAdmobIdByKey:kConfigAdmobInterstitialId]);
        NSLog(@"kConfigAdmobRewardedVideoId:%@",[self getAdmobIdByKey:kConfigAdmobRewardedVideoId]);
        NSLog(@"kConfigAdmobNativeId:%@",[self getAdmobIdByKey:kConfigAdmobNativeId]);
        NSLog(@"getAdmobTestDevices:%@",[self getAdmobTestDevices]);
        NSLog(@"kConfigFBAppId:%@",[self getFacebookIdByKey:kConfigFBAppId]);
        NSLog(@"kConfigFBInviteAppUrl:%@",[self getFacebookIdByKey:kConfigFBInviteAppUrl]);
        NSLog(@"kConfigFBInviteImageUrl:%@",[self getFacebookIdByKey:kConfigFBInviteImageUrl]);
        NSLog(@"kConfigFBInvitePromotText:%@",[self getFacebookIdByKey:kConfigFBInvitePromotText]);
        NSLog(@"kConfigFBInvitePromotCode:%@",[self getFacebookIdByKey:kConfigFBInvitePromotCode]);
        NSLog(@"kConfigFBShareAppUrl:%@",[self getFacebookIdByKey:kConfigFBShareAppUrl]);
        NSLog(@"kConfigFlurryApiKey:%@",[self getFlurryIdByKey:kConfigFlurryApiKey]);
        NSLog(@"getPurchaseSkus:%@",[self getPurchaseSkus]);
    }
    return YES;
}

+ (void)setUpConfigsByJaveScript:(NSString*)data
{
    // 初始化所有Manager viewController 在AppController里面设置过了
    UIViewController *controller = [ConfigManager getInstance].viewController;
    [[ConfigManager getInstance] setUpEnvironment:controller withConfigs:data withDebug:NO];
    //
    BOOL debug = [ConfigManager getInstance].debug;
    [[NativeManager getInstance] setUpEnvironment:controller withDebug:debug];
    
#if __ENABLE_FLURRY
    [[FlurryManager getInstance] setUpEnvironment:controller withDebug:debug];
#endif
#if __ENABLE_FACEBOOK__
    [[FaceBookManager getInstance] setUpEnvironment:controller withDebug:debug];
#endif
#if __ENABLE_PURCHASE
    [[IAPurchaseManager getInstance] setUpEnvironment:controller withDebug:debug];
#endif
#if __ENABLE_AD__
    [[AdsManager getInstance] setUpEnvironment:controller
                                     withQueue:@{
                                                 [NSString stringWithFormat:@"%ld", (long)kAdTypeNativeAd] // key
                                                 :@[[NSNumber numberWithInt:kAdAgentAdmob]], // Queue
                                                 [NSString stringWithFormat:@"%ld", (long)kAdTypeBanner] // key
                                                 :@[[NSNumber numberWithInt:kAdAgentAdmob]], // Queue
                                                 [NSString stringWithFormat:@"%ld", (long)kAdTypeInterstitial] // key
                                                 :@[[NSNumber numberWithInt:kAdAgentAdmob]], // Queue
                                                 [NSString stringWithFormat:@"%ld", (long)kAdTypeRewardedVideo] // key
                                                 :@[[NSNumber numberWithInt:kAdAgentAdmob]], // Queue
                                                 }
                                      andDebug:debug];
    [[AdsManager getInstance] show:kAdTypeNativeAd];
#endif
}

- (NSString*)getPrivacyUrl
{
    return [self.configsDict objectForKey:kConfigPrivacyUrl];
}

- (NSString*)getAppleIdByKey:(NSString*)key
{
    NSDictionary *dict = [self.configsDict objectForKey:kConfigApple];
    return [dict objectForKey:key];
}

- (NSString*)getAdmobIdByKey:(NSString*)key
{
    NSDictionary *dict = [self.configsDict objectForKey:kConfigAdmob];
    return [dict objectForKey:key];
}

- (NSArray*)getAdmobTestDevices
{
    NSDictionary *dict = [self.configsDict objectForKey:kConfigAdmob];
    return [dict objectForKey:kConfigAdmobTestDevices];
}

- (NSString*)getFacebookIdByKey:(NSString*)key
{
    NSDictionary *dict = [self.configsDict objectForKey:kConfigFB];
    return [dict objectForKey:key];
}

- (NSString*)getFlurryIdByKey:(NSString*)key
{
    NSDictionary *dict = [self.configsDict objectForKey:kConfigFlurry];
    return [dict objectForKey:key];
}

- (NSString*)getPurchaseIdByKey:(NSString*)key
{
    NSDictionary *dict = [self.configsDict objectForKey:kConfigPurchase];
    return [dict objectForKey:key];
}

- (NSArray*)getPurchaseSkus
{
    NSDictionary *dict = [self.configsDict objectForKey:kConfigPurchase];
    return [dict objectForKey:kConfigPurchaseSkus];
}

@end
