//
//  AdInterface.h
//  HotFixer
//
//  Created by 唐博文 on 2017/6/1.
//
//

#import <Foundation/Foundation.h>

@interface AdInterface : NSObject

+ (void)preloadAll:(NSString*)data;

+ (void)preload:(NSString*)data;

+ (void)show:(NSString*)data;

+ (void)hide:(NSString*)data;

+ (NSString*)isAvailable:(NSString*)data;

+ (NSString*)isShown:(NSString*)data;

+ (NSString*)getGravity:(NSString*)data;

+ (void)setGravity:(NSString*)data;

+ (void)setDelegate:(NSString*)data;

@end
