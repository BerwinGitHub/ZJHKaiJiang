//
//  Privacy-IOS.h
//  PPLibrary
//
//  Created by tangbowen on 16/8/18.
//
//

#ifndef InAppWebView_h
#define InAppWebView_h

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

#define BAR_HEIGHT      40
#define TAG_CLOSE       1001

#define kPrivacyWillShownedNotification @"privacy_click"
#define kPrivacyWillDismissNotification @"privacy_close"
#define UIColor(r,g,b,a)                [UIColor colorWithRed:r / 255.0 green:g / 255.0 blue:b / 255.0 alpha:a / 255.0]

@interface InAppWebView : UIView<WKNavigationDelegate, UIAlertViewDelegate>{
    WKWebView               *_webView;
    UIActivityIndicatorView *_indicator;
    float                   _screenWidth;
    float                   _screenHeight;
}

- (instancetype)initWithURL:(NSString*)url;

-(void)showInView:(UIView*)theView;
-(void)dismiss;

-(void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex;

@end

#endif /* InAppWebView_h */
