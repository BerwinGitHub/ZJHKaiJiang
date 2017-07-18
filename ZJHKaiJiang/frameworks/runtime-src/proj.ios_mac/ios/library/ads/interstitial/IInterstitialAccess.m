//
//  IRewardedVideoAccess.h
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "IInterstitialAccess.h"

@implementation IInterstitialAccess

- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    return [super setUpEnvironment:viewController withDebug:debug];
}

- (void)preload
{
    [super preload];
}

- (void)preloadWithCallback:(AvailableBlock) block
{
    [super preloadWithCallback:block];
}

- (BOOL)show
{
    return [super show];
}

- (void)hide
{
    [super hide];
}

- (void)log:(NSObject*) msg
{
    [super log:msg];
}

@end
