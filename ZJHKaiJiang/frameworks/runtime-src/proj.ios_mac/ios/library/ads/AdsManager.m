//
//  AdsManager.m
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "AdsManager.h"
#import "BannerManager.h"
#import "InterstitialManager.h"
#import "RewardedVideoManager.h"
#import "NativeAdManager.h"

@implementation AdsManager

static AdsManager *_instance = nil;

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
    return YES;
}

- (BOOL)setUpEnvironment:(UIViewController*)viewController withQueue:(NSDictionary*)dictQueue andDebug:(BOOL)debug
{
    [self setUpEnvironment:viewController withDebug:debug];
    self.managerArray = [[NSArray alloc] initWithObjects: [BannerManager getInstance], [InterstitialManager getInstance], [RewardedVideoManager getInstance], [NativeAdManager getInstance], nil];
    NSArray *queueKey = [[NSArray alloc] initWithObjects:
                         [NSString stringWithFormat:@"%ld", (long)kAdTypeBanner],
                         [NSString stringWithFormat:@"%ld", (long)kAdTypeInterstitial],
                         [NSString stringWithFormat:@"%ld", (long)kAdTypeRewardedVideo],
                         [NSString stringWithFormat:@"%ld", (long)kAdTypeNativeAd],
                         nil];
    
    for (int i = 0; i < [self.managerArray count]; i++) {
        IManagerAccess *manager = [self.managerArray objectAtIndex:i];
        NSString *key = [queueKey objectAtIndex:i];
        NSArray *queue = [dictQueue objectForKey:key];
        [manager setUpEnvironment:viewController withQueue:queue andDebug:debug];
    }
    
    return YES;
}

#pragma mark -实现广告的方法
- (void)preloadAll
{
    for (IManagerAccess *manager in self.managerArray) {
        [manager preload];
    }
}

- (void)preload:(int)type
{
    IManagerAccess *manager = [self getManagerByType:type];
    if (manager) {
        [manager preload];
    }
}

- (BOOL)show:(int)type
{
    IManagerAccess *manager = [self getManagerByType:type];
    if (manager) {
        return [manager show];
    }
    return NO;
}

- (void)hide:(int)type
{
    IManagerAccess *manager = [self getManagerByType:type];
    if (manager) {
        [manager hide];
    }
}

- (BOOL)isAvailable:(int)type
{
    IManagerAccess *manager = [self getManagerByType:type];
    if (manager) {
        return [manager isAvailable];
    }
    return NO;
}

- (BOOL)isShown:(int)type
{
    IManagerAccess *manager = [self getManagerByType:type];
    if (manager) {
        return [manager isShown];
    }
    return NO;
}

- (int)getGravity
{
    return [[BannerManager getInstance] getGravity];
}

- (void)setGravity:(int)gravity
{
    [[BannerManager getInstance] setGravity:gravity];
}

- (void)adsCallback:(int)adType methodType:(int)methodType available:(BOOL)available amount:(int)amount err:(int)err
{
    if(self.blockListener){
        self.blockListener(adType, methodType, available, amount, err);
    }
    if (self.listener != nil) {
        [self.listener adsCallback:adType methodType:methodType available:available amount:amount err:err];
    }
}

#pragma mark -private
- (IManagerAccess*)getManagerByType:(int)type
{
    if(type < 0 || type >= [self.managerArray count]) {
        return nil;
    }
    return [self.managerArray objectAtIndex:type];
}

@end
