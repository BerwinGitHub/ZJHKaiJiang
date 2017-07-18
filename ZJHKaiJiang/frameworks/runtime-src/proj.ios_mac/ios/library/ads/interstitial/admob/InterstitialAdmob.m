//
//  InterstitialAdmob.m
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "InterstitialAdmob.h"
#import "AdsManager.h"

@implementation InterstitialAdmob

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
    [self setAdType:kAdTypeInterstitial];
    [self setAdAgent:kAdAgentAdmob];
    // 初始化Interstitial && 设置ID
    NSString *unitID = [[ConfigManager getInstance] getAdmobIdByKey:kConfigAdmobInterstitialId];
    [self log:[NSString stringWithFormat:@"UnitID:%@", unitID]];
    self.interstitial = [[GADInterstitial alloc] initWithAdUnitID:unitID];
    // 设置监听
    [self.interstitial setDelegate:self];
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
    [self.interstitial loadRequest:request];
}

- (BOOL)show
{
    if(self.interstitial.isReady){
        [self.interstitial presentFromRootViewController:self.viewController];
        return YES;
    } else {
        [self log:@"interstitial is not ready"];
    }
    return NO;
}

- (void)hide
{
    [self log:@"RewardedVideo hide not implements. Please hide rewardedVideo re view"];
}


#pragma mark ----------------Interstitial----------------
#pragma mark Ad Request Lifecycle Notifications
- (void)interstitialDidReceiveAd:(GADInterstitial *)ad
{
    [self log:@"Interstitial interstitialDidReceiveAd"];
    self.available = self.interstitial.isReady;
    if(self.availableBlock){
        self.availableBlock(self, self.available);
    }
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLoaded available:self.available amount:-1 err:-1];
}

- (void)interstitial:(GADInterstitial *)ad didFailToReceiveAdWithError:(GADRequestError *)error
{
    [self log:[NSString stringWithFormat:@"Interstitial didFailToReceiveAdWithError:%d", (int)error.code]];
    self.available = self.interstitial.isReady;
    if(self.availableBlock){
        self.availableBlock(self, self.available);
    }
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeFailedToLoad available:self.available amount:-1 err:(int)[error code]];
}

#pragma mark Display-Time Lifecycle Notifications
- (void)interstitialWillPresentScreen:(GADInterstitial *)ad
{
    [self log:@"Interstitial interstitialWillPresentScreen"];
    self.available = self.interstitial.isReady;
    self.shown = YES;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeOpen available:self.available amount:-1 err:-1];
}

- (void)interstitialDidFailToPresentScreen:(GADInterstitial *)ad
{
    [self log:@"Interstitial interstitialDidFailToPresentScreen"];
    self.available = self.interstitial.isReady;
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeFailedOpen available:self.available amount:-1 err:-1];
}


- (void)interstitialWillDismissScreen:(GADInterstitial *)ad
{
    [self log:@"Interstitial interstitialWillDismissScreen"];
    self.available = self.interstitial.isReady;
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeWillClose available:self.available amount:-1 err:-1];
}

- (void)interstitialDidDismissScreen:(GADInterstitial *)ad
{
    [self log:@"Interstitial interstitialDidDismissScreen"];
    self.available = self.interstitial.isReady;
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeClosed available:self.available amount:-1 err:-1];
    // 关闭重新加载
    [self preload];
}

- (void)interstitialWillLeaveApplication:(GADInterstitial *)ad
{
    [self log:@"Interstitial interstitialWillLeaveApplication"];
    self.available = self.interstitial.isReady;
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLeftApplication available:self.available amount:-1 err:-1];
}

@end
