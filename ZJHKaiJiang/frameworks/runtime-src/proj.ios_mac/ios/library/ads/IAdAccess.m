//
//  IAdAccess.m
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "IAdAccess.h"

@implementation IAdAccess

- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    self.viewController = viewController;
    self.debug = debug;
    self.available = NO;
    self.shown = NO;
    return YES;
}

- (void)preload
{
    
}

- (void)preloadWithCallback:(AvailableBlock) block
{
    self.availableBlock = block;
    [self preload];
}

- (BOOL)show
{

    return YES;
}

- (void)hide
{
    
}

- (void)log:(NSObject*) msg
{
    if ([self debug]) {
        NSLog(@"Ads\t:%@", msg);
    }
}

@end
