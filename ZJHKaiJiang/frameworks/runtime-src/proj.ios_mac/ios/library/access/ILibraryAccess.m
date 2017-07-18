//
//  INative.m
//  HotFixer
//
//  Created by 唐博文 on 2017/5/30.
//
//

#import "ILibraryAccess.h"

@implementation ILibraryAccess

- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    self.viewController = viewController;
    self.debug = debug;
    return YES;
}

@end
