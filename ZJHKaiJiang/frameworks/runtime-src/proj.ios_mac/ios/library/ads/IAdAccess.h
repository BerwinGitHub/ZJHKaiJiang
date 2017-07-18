//
//  IAdAccess.h
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "ConfigManager.h"
#import "Utility.h"

@interface IAdAccess : NSObject

// 用于查看该视频是否加载好，方便判断是否加载后面的广告
typedef void(^AvailableBlock)(IAdAccess *ad, BOOL available);

// 广告类型
typedef NS_ENUM(NSInteger, AdType){
    kAdTypeBanner          = 0,    // Banner(横幅)广告
    kAdTypeInterstitial    = 1,    // Interstitial(全屏/非插页式)广告
    kAdTypeRewardedVideo   = 2,    // RewardedVideo(视频/激励)广告
    kAdTypeNativeAd        = 3     // NativeAd(原生广告)广告
};

// 广告代理商
typedef NS_ENUM(NSInteger, AdAgent){
    kAdAgentAdmob           = 0,    // 广告代理商：Admob
    kAdAgentFacebook        = 1,    // 广告代理商：Facebook
};

#pragma mark -property
/**
 * 当前有些的ViewController对象
 */
@property(nonatomic, strong)UIViewController *viewController;

/**
 * 当前是否是debug模式
 */
@property(nonatomic, readwrite)BOOL debug;

/**
 * 广告的类型，一般为AdType enum的枚举值。方便JavaScript传递参数，所有用int表示
 */
@property(nonatomic, readwrite)int adType;

/**
 * 广告的代理，现在主要为kAdAgentAdmob/kAdAgentFacebook
 */
@property(nonatomic, readwrite)int adAgent;

/**
 * 广告是否可用
 */
@property(nonatomic, readwrite)BOOL available;

/**
 * 广告是否已经在显示
 */
@property(nonatomic, readwrite)BOOL shown;

/**
 * 在加载失败之后是否强制重新加载。默认NO, 默认在游戏中自己控制加载失败之后重新加载的时机
 */
@property(nonatomic, readwrite)BOOL foreReload;

/**
 * 查看是否preload成功回调
 */
@property(nonatomic, copy)AvailableBlock availableBlock;

#pragma mark -method
- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug;

- (void)preload;

- (void)preloadWithCallback:(AvailableBlock) block;

- (BOOL)show;

- (void)hide;

- (void)log:(NSObject*) msg;


@end
