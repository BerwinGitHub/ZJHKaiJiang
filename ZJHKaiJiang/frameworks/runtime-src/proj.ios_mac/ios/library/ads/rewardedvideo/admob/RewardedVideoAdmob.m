//
//  RewardedVideoAdmob.m
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "RewardedVideoAdmob.h"
#import "AdsManager.h"

@implementation RewardedVideoAdmob

// 将父类的变量重新指定一遍
//@synthesize viewController  = _viewController;
//@synthesize debug           = _debug;
//@synthesize available       = _available;
//@synthesize adType          = _adType;
//@synthesize shown           = _shown;
//@synthesize foreReload      = _foreReload;

- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    [super setUpEnvironment:viewController withDebug:debug];
    [self setAdType:kAdTypeRewardedVideo];
    [self setAdAgent:kAdAgentAdmob];
    // 初始化RewardedVideo && 设置ID
    [GADRewardBasedVideoAd sharedInstance];
    // 设置监听
    [[GADRewardBasedVideoAd sharedInstance] setDelegate:self];
    // 设置RootViewController
    // 默认隐藏
    [self hide];
    
    return YES;
}

- (void)preload
{
    GADRequest *request = [GADRequest request];
    if(self.debug){
        NSMutableArray *arr = (NSMutableArray*)[[ConfigManager getInstance] getAdmobTestDevices];
        [arr addObject:kGADSimulatorID]; // 添加模拟器
        request.testDevices = arr;
    }
    NSString *unitID = [[ConfigManager getInstance] getAdmobIdByKey:kConfigAdmobRewardedVideoId];
    [self log:[NSString stringWithFormat:@"UnitID:%@", unitID]];
    [[GADRewardBasedVideoAd sharedInstance] loadRequest:request
                                           withAdUnitID:unitID];
}

- (BOOL)show
{
    if ([[GADRewardBasedVideoAd sharedInstance] isReady]) {
        [[GADRewardBasedVideoAd sharedInstance] presentFromRootViewController:self.viewController];
    } else {
        [self log:@"RewardedVideo is not ready"];
    }
    return NO;
}

- (void)hide
{
    [self log:@"RewardedVideo hide not implements. Please hide rewardedVideo re view"];
}

#pragma mark ----------------RewardedVideo----------------
// 看完视频得到奖励
- (void)rewardBasedVideoAd:(GADRewardBasedVideoAd *)rewardBasedVideoAd
   didRewardUserWithReward:(GADAdReward *)reward
{
    [self log:@"RewardedVideo rewardBasedVideoAd:didRewardUserWithReward"];
    self.shown = NO;
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeRewarded available:self.available amount:[reward.amount intValue] err:-1];
    
}

// 加载失败
- (void)rewardBasedVideoAd:(GADRewardBasedVideoAd *)rewardBasedVideoAd
    didFailToLoadWithError:(NSError *)error
{
    [self log:[NSString stringWithFormat:@"RewardedVideo didFailToLoadWithError:%d", (int)error.code]];
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    if(self.availableBlock){
        self.availableBlock(self, self.available);
    }
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeFailedToLoad available:self.available amount:-1 err:(int)[error code]];
}

// 加载成功
- (void)rewardBasedVideoAdDidReceiveAd:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self log:@"RewardedVideo rewardBasedVideoAdDidReceiveAd"];
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    if(self.availableBlock){
        self.availableBlock(self, self.available);
    }
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLoaded available:self.available amount:-1 err:-1];
}

- (void)rewardBasedVideoAdDidOpen:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self log:@"RewardedVideo rewardBasedVideoAdDidOpen"];
    self.shown = YES;
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeOpen available:self.available amount:-1 err:-1];
}

- (void)rewardBasedVideoAdDidStartPlaying:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self log:@"RewardedVideo rewardBasedVideoAdDidStartPlaying"];
    self.shown = YES;
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeStarted available:self.available amount:-1 err:-1];
}

- (void)rewardBasedVideoAdDidClose:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    // 关闭重新加载
    [self preload];
    [self log:@"RewardedVideo rewardBasedVideoAdDidClose"];
    self.shown = NO;
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeClosed available:self.available amount:-1 err:-1];
}

- (void)rewardBasedVideoAdWillLeaveApplication:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self log:@"RewardedVideo rewardBasedVideoAdWillLeaveApplication"];
    self.shown = NO;
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLeftApplication available:self.available amount:-1 err:-1];
}

@end
