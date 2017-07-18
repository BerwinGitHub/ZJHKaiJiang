//
//  NativeAdAdmob.m
//  HotFixer
//
//  Created by 唐博文 on 2017/6/6.
//
//

#import "NativeAdAdmob.h"
#import "AdsManager.h"

@implementation NativeAdAdmob

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
    [self setAdType:kAdTypeNativeAd];
    [self setAdAgent:kAdAgentAdmob];
    
    // 初始化RewardedVideo && 设置ID
    NSString *unitID = [[ConfigManager getInstance] getAdmobIdByKey:kConfigAdmobNativeId];
    [self log:[NSString stringWithFormat:@"UnitID:%@", unitID]];
    self.nativeAdView = [[GADNativeExpressAdView alloc] initWithAdSize:GADAdSizeFromCGSize([Utility screenSize])];
    self.nativeAdView.adUnitID = unitID;
    self.nativeAdView.rootViewController = self.viewController;
    self.nativeAdView.delegate = self;
    [self.rootView addSubview:self.nativeAdView];
    
    GADVideoOptions *videoOptions = [[GADVideoOptions alloc] init];
    videoOptions.startMuted = true;
    [self.nativeAdView setAdOptions:@[ videoOptions ]];
    self.nativeAdView.videoController.delegate = self;
    
    // 设置RootViewController
    // 默认隐藏
//    [self preload];
    
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
    [self.nativeAdView loadRequest:request];
}

- (BOOL)show
{
    if(self.nativeAdView != nil){
        [self.nativeAdView setHidden:NO];
    }
    return YES;
}

- (void)hide
{
    if(self.nativeAdView != nil){
        [self.nativeAdView setHidden:YES];
    }
}

#pragma mark Ad Request Lifecycle Notifications
- (void)nativeExpressAdViewDidReceiveAd:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self log:@"nativeExpressAdViewDidReceiveAd"];
    self.available = YES;
    if(self.availableBlock){
        self.availableBlock(self, self.available);
    }
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLoaded available:self.available amount:-1 err:-1];
}

- (void)nativeExpressAdView:(GADNativeExpressAdView *)nativeExpressAdView
didFailToReceiveAdWithError:(GADRequestError *)error
{
    [self log:@"didFailToReceiveAdWithError"];
    self.available = NO;
    if(self.availableBlock){
        self.availableBlock(self, self.available);
    }
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeFailedToLoad available:self.available amount:-1 err:(int)[error code]];
    
}
#pragma mark Click-Time Lifecycle Notifications
- (void)nativeExpressAdViewWillPresentScreen:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self log:@"nativeExpressAdViewWillPresentScreen"];
    self.shown = YES;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeOpen available:self.available amount:-1 err:-1];
}

- (void)nativeExpressAdViewWillDismissScreen:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self preload];
    [self log:@"nativeExpressAdViewWillDismissScreen"];
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeWillClose available:self.available amount:-1 err:-1];
}

- (void)nativeExpressAdViewDidDismissScreen:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self log:@"nativeExpressAdViewDidDismissScreen"];
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeClosed available:self.available amount:-1 err:-1];
}

- (void)nativeExpressAdViewWillLeaveApplication:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self log:@"nativeExpressAdViewWillLeaveApplication"];
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLeftApplication available:self.available amount:-1 err:-1];
}

#pragma mark Native Video
- (void)videoControllerDidPlayVideo:(GADVideoController *)videoController
{
    [self log:@"videoControllerDidPlayVideo"];
}

- (void)videoControllerDidPauseVideo:(GADVideoController *)videoController
{
    [self log:@"videoControllerDidPauseVideo"];
}

- (void)videoControllerDidEndVideoPlayback:(GADVideoController *)videoController
{
    [self log:@"videoControllerDidEndVideoPlayback"];
}

- (void)videoControllerDidMuteVideo:(GADVideoController *)videoController
{
    [self log:@"videoControllerDidMuteVideo"];
}

- (void)videoControllerDidUnmuteVideo:(GADVideoController *)videoController
{
    [self log:@"videoControllerDidUnmuteVideo"];
}

@end
