//
//  FaceBookManager.h
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import <Foundation/Foundation.h>
#import "ILibraryAccess.h"

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <FBSDKShareKit/FBSDKShareKit.h>

typedef void(^FBInviteComplete)(NSError *err, NSDictionary *results);
typedef void(^FBShareComplete)(NSError *err, BOOL cancelled, NSDictionary *results);

@interface FaceBookManager : ILibraryAccess<FBSDKAppInviteDialogDelegate, FBSDKSharingDelegate>
{
}
@property(nonatomic, copy)FBInviteComplete inviteComplete;
@property(nonatomic, copy)FBShareComplete shareComplete;

+ (instancetype)getInstance;
+ (void)pure;

- (void)loginWithPermissions:(NSArray*)permissions handler:(FBSDKLoginManagerRequestTokenHandler)handler;

- (BOOL)isLogin;

- (void)invite:(FBInviteComplete) delegate;

- (void)share:(FBShareComplete) delegate;

- (void)graphRequest:(NSString*)graphPath parameters:(NSDictionary *)parameters handler:(FBSDKGraphRequestHandler)handler httpMethod:(NSString*)method;

- (FBSDKProfile*)getCurrentProile;

- (void)logEvent:(NSString*)eventName withParameters:(NSDictionary*)params;

- (void)logEvent:(NSString*)eventName valueToSum:(double)sum;

- (void)logEvent:(NSString*)eventName;

- (FBSDKAccessToken*)currentAccessToken;

#pragma -mark delegate
- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didCompleteWithResults:(NSDictionary *)results;

- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didFailWithError:(NSError *)error;

// Share
- (void)sharer:(id<FBSDKSharing>)sharer didCompleteWithResults:(NSDictionary *)results;

- (void)sharer:(id<FBSDKSharing>)sharer didFailWithError:(NSError *)error;

- (void)sharerDidCancel:(id<FBSDKSharing>)sharer;

@end
