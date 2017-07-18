//
//  ConfigManager.h
//  HotFixer
//
//  Created by 唐博文 on 2017/5/30.
//
//

#import "ILibraryAccess.h"

#define __ENABLE_FACEBOOK__             false
#define __ENABLE_AD__                   true
#define __ENABLE_FLURRY__               true
#define __ENABLE_PURCHASE__             true

#define kConfigApple                    @"apple"
#define kConfigAppleAppId               @"app_id"
#define kConfigAppleAppUrl              @"app_url"
#define kConfigDebug                    @"debug"
#define kConfigPrivacyUrl               @"privacyUrl"
// Admob
#define kConfigAdmob                    @"admob"
#define kConfigAdmobTestDevices         @"testDevices"
#define kConfigAdmobAppId               @"app_id"
#define kConfigAdmobBannerId            @"banner_unit_id"
#define kConfigAdmobInterstitialId      @"interstitial_unit_id"
#define kConfigAdmobRewardedVideoId     @"rewardedvideo_unit_id"
#define kConfigAdmobNativeId            @"native_unit_id"
// Facebook
#define kConfigFB                       @"facebook"
#define kConfigFBAppId                  @"app_id"
#define kConfigFBAppId                  @"app_id"
#define kConfigFBInviteAppUrl           @"invite_app_url"
#define kConfigFBInviteImageUrl         @"invite_image_url"
#define kConfigFBInvitePromotText       @"invite_promot_text"
#define kConfigFBInvitePromotCode       @"invite_promot_code"
#define kConfigFBShareAppUrl            @"share_app_url"
// Flurry
#define kConfigFlurry                   @"flurry"
#define kConfigFlurryApiKey             @"api_key"
 // Purchase
#define kConfigPurchase                 @"purchase"
#define kConfigPurchaseSkus             @"skus"

@interface ConfigManager : ILibraryAccess

/**
 * 所有id dict
 */
@property(nonatomic, strong)NSDictionary *configsDict;

+ (instancetype)getInstance;
+ (void)pure;

+ (void)setUpConfigsByJaveScript:(NSString*)data;

- (BOOL)setUpEnvironment:(UIViewController*)viewController withConfigs:(NSString*)configs withDebug:(BOOL)debug;

- (NSString*)getPrivacyUrl;

- (NSString*)getAppleIdByKey:(NSString*)key;

- (NSString*)getAdmobIdByKey:(NSString*)key;

- (NSArray*)getAdmobTestDevices;

- (NSString*)getFacebookIdByKey:(NSString*)key;

- (NSString*)getFlurryIdByKey:(NSString*)key;

- (NSString*)getPurchaseIdByKey:(NSString*)key;

- (NSArray*)getPurchaseSkus;

@end
