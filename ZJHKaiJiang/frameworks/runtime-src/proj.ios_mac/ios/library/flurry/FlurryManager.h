//
//  FlurryManager.h
//  slotsgame
//
//  Created by admin on 2017/5/6.
//
//

#import "ILibraryAccess.h"

@interface FlurryManager : ILibraryAccess

+ (instancetype)getInstance;
+ (void)pure;

- (void)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions;

- (void)logEvent:(NSString*)name;

- (void)logEvent:(NSString *)name timed:(BOOL)timed;

- (void)logEvent:(NSString*)name withParameters:(NSDictionary*)params;

- (void)logEvent:(NSString*)name withParameters:(NSDictionary*)params timed:(BOOL)timed;

- (void)endEvent:(NSString*)event withParameters:(NSDictionary*)params;

@end
