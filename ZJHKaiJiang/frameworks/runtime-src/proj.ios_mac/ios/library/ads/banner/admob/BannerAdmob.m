//
//  BannerAdmob.m
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "BannerAdmob.h"
#import "AdsManager.h"

@implementation BannerAdmob

// 将父类的变量重新指定一遍
//@synthesize viewController  = _viewController;
//@synthesize debug           = _debug;
//@synthesize available       = _available;
//@synthesize adType          = _adType;
//@synthesize shown           = _shown;
//@synthesize foreReload      = _foreReload;
@synthesize gravity         = _gravity;

- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    [super setUpEnvironment:viewController withDebug:debug];
    [self setAdType:kAdTypeBanner];
    [self setAdAgent:kAdAgentAdmob];
    // 初始化Banner
    GADAdSize size = IS_IPHONE ? kGADAdSizeBanner : kGADAdSizeFullBanner;
    self.bannerView = [[GADBannerView alloc] initWithAdSize:size];
    // 设置监听
    [self.bannerView setDelegate:self];
    // 设置ID
    NSString *unitID = [[ConfigManager getInstance] getAdmobIdByKey:kConfigAdmobBannerId];
    [self log:[NSString stringWithFormat:@"UnitID:%@", unitID]];
    [self.bannerView setAdUnitID:unitID];
    // 设置RootViewController
    [self.bannerView setRootViewController:viewController];
    [self.viewController.view addSubview:self.bannerView];
    [self setGravity:kGravityBottom];
    // 默认隐藏
    [self hide];
    
    return YES;
}

- (void)preload
{
    GADRequest *request = [GADRequest request];
    if(self.debug){
        request.testDevices = [[ConfigManager getInstance] getAdmobTestDevices];
    }
    [self.bannerView loadRequest:request];
}

- (BOOL)show
{
    [self.bannerView setHidden:NO];
    return YES;
}

- (void)hide
{
    [self.bannerView setHidden:YES];
}

- (void)setGravity:(int)gravity
{
    _gravity = gravity;
    // Banner的Size
    CGSize bs = [self.bannerView adSize].size;
    // Screen的Size
    CGSize ss = [Utility screenSize];
    float y = (_gravity != kGravityTop ? (ss.height - bs.height) : 0);
    self.bannerView.frame = CGRectMake((ss.width - bs.width) / 2 , y, bs.width, bs.height);
}

#pragma mark ----------------Banner----------------
#pragma mark Ad Request Lifecycle Notifications
- (void)adViewDidReceiveAd:(GADBannerView *)bannerView
{
    [self log:@"Banner adViewDidReceiveAd"];
    self.available = YES;
    if(self.availableBlock){
        self.availableBlock(self, self.available);
    }
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLoaded available:self.available amount:-1 err:-1];
}

- (void)adView:(GADBannerView *)bannerView didFailToReceiveAdWithError:(GADRequestError *)error
{
    [self log:[NSString stringWithFormat:@"Banner didFailToReceiveAdWithError:%d", (int)error.code]];
    self.available = NO;
    if(self.availableBlock){
        self.availableBlock(self, self.available);
    }
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeFailedToLoad available:self.available amount:-1 err:(int)[error code]];
}

#pragma mark Click-Time Lifecycle Notifications
- (void)adViewWillPresentScreen:(GADBannerView *)bannerView
{
    [self log:@"Banner adViewWillPresentScreen"];
    self.shown = YES;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeOpen available:self.available amount:-1 err:-1];
}

- (void)adViewWillDismissScreen:(GADBannerView *)bannerView
{
    [self log:@"Banner adViewWillDismissScreen"];
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeWillClose available:self.available amount:-1 err:-1];
}

- (void)adViewDidDismissScreen:(GADBannerView *)bannerView
{
    [self log:@"Banner adViewDidDismissScreen"];
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeClosed available:self.available amount:-1 err:-1];
}

- (void)adViewWillLeaveApplication:(GADBannerView *)bannerView
{
    [self log:@"Banner adViewWillLeaveApplication"];
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLeftApplication available:self.available amount:-1 err:-1];
}


@end
