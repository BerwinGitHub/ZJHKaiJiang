<GameFile>
  <PropertyGroup Name="seat_right" Type="Node" ID="74597c4d-0d03-4d3f-82df-1ae151403595" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="125" Speed="1.0000" ActivedAnimationName="amt_chat">
        <Timeline ActionTag="-2141380223" Property="Position">
          <PointFrame FrameIndex="50" X="73.2407" Y="42.4369">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="60" X="73.2407" Y="42.4369">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="110" X="73.2407" Y="42.4369">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="125" X="73.2407" Y="42.4369">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="-2141380223" Property="Scale">
          <ScaleFrame FrameIndex="50" X="0.0100" Y="0.0100">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="60" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="110" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="125" X="0.0100" Y="0.0100">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="-2141380223" Property="RotationSkew">
          <ScaleFrame FrameIndex="50" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="60" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="110" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="125" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="1801394363" Property="Position">
          <PointFrame FrameIndex="0" X="90.0000" Y="35.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="15" X="90.0000" Y="55.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="40" X="90.0000" Y="55.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="45" X="90.0000" Y="55.0000">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="1801394363" Property="Scale">
          <ScaleFrame FrameIndex="0" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="15" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="40" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="45" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="1801394363" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="15" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="40" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="45" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="1801394363" Property="Alpha">
          <IntFrame FrameIndex="0" Value="0">
            <EasingData Type="0" />
          </IntFrame>
          <IntFrame FrameIndex="15" Value="255">
            <EasingData Type="0" />
          </IntFrame>
          <IntFrame FrameIndex="40" Value="255">
            <EasingData Type="0" />
          </IntFrame>
          <IntFrame FrameIndex="45" Value="0">
            <EasingData Type="0" />
          </IntFrame>
        </Timeline>
      </Animation>
      <AnimationList>
        <AnimationInfo Name="amt_opt" StartIndex="0" EndIndex="45">
          <RenderColor A="255" R="135" G="206" B="250" />
        </AnimationInfo>
        <AnimationInfo Name="amt_chat" StartIndex="50" EndIndex="125">
          <RenderColor A="255" R="184" G="134" B="11" />
        </AnimationInfo>
      </AnimationList>
      <ObjectData Name="Node" Tag="114" ctype="GameNodeObjectData">
        <Size X="0.0000" Y="0.0000" />
        <Children>
          <AbstractNodeData Name="count_down" ActionTag="-947920917" Tag="84" IconVisible="True" ctype="SingleNodeObjectData">
            <Size X="0.0000" Y="0.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.0000" Y="0.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="seat_bg" ActionTag="-1244693725" Tag="127" IconVisible="False" LeftMargin="-90.0000" RightMargin="-90.0000" TopMargin="-55.0000" BottomMargin="-55.0000" ctype="SpriteObjectData">
            <Size X="180.0000" Y="110.0000" />
            <Children>
              <AbstractNodeData Name="user_info" ActionTag="-1338311633" Tag="169" IconVisible="True" LeftMargin="90.0000" RightMargin="90.0000" TopMargin="55.0000" BottomMargin="55.0000" ctype="SingleNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <Children>
                  <AbstractNodeData Name="user_header" ActionTag="-187520340" Tag="78" IconVisible="False" LeftMargin="0.6827" RightMargin="-96.6827" TopMargin="-62.9962" BottomMargin="-33.0038" ctype="SpriteObjectData">
                    <Size X="96.0000" Y="96.0000" />
                    <Children>
                      <AbstractNodeData Name="user_header_border" ActionTag="-1876134726" Tag="79" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" ctype="SpriteObjectData">
                        <Size X="96.0000" Y="96.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="48.0000" Y="48.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="1.0000" Y="1.0000" />
                        <FileData Type="MarkedSubImage" Path="studio/com/images/ui/user_face_b_96.png" Plist="studio/com/images/ui.plist" />
                        <BlendFunc Src="1" Dst="771" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="48.6827" Y="14.9962" />
                    <Scale ScaleX="0.7000" ScaleY="0.7000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="MarkedSubImage" Path="studio/com/images/ui/user_face_m_96.png" Plist="studio/com/images/ui.plist" />
                    <BlendFunc Src="1" Dst="771" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="user_name" ActionTag="-1867730006" Tag="129" IconVisible="False" LeftMargin="13.6827" RightMargin="-83.6827" TopMargin="20.3551" BottomMargin="-34.3551" IsCustomSize="True" FontSize="12" LabelText="Berwin" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="1.0000" ShadowOffsetY="-1.0000" ctype="TextObjectData">
                    <Size X="70.0000" Y="14.0000" />
                    <AnchorPoint ScaleX="0.4908" ScaleY="0.4075" />
                    <Position X="48.0387" Y="-28.6501" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="user_coin" ActionTag="-403931047" Tag="136" IconVisible="False" LeftMargin="13.6827" RightMargin="-83.6827" TopMargin="36.0324" BottomMargin="-50.0324" IsCustomSize="True" FontSize="12" LabelText="21202.52万" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="1.0000" ShadowOffsetY="-1.0000" ctype="TextObjectData">
                    <Size X="70.0000" Y="14.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="48.6827" Y="-43.0324" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="90.0000" Y="55.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0000" Y="0.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="pockers" ActionTag="-1710336058" Tag="138" IconVisible="True" LeftMargin="90.0000" RightMargin="90.0000" TopMargin="55.0000" BottomMargin="55.0000" ctype="SingleNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <Children>
                  <AbstractNodeData Name="poker_0" ActionTag="-322991098" Tag="108" IconVisible="True" LeftMargin="-85.0000" RightMargin="85.0000" TopMargin="50.0000" BottomMargin="-50.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position X="-85.0000" Y="-50.0000" />
                    <Scale ScaleX="0.6000" ScaleY="0.6000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="Normal" Path="studio/room/components/card.csd" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="poker_1" ActionTag="-1196186781" Tag="115" IconVisible="True" LeftMargin="-60.0000" RightMargin="60.0000" TopMargin="50.0000" BottomMargin="-50.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position X="-60.0000" Y="-50.0000" />
                    <Scale ScaleX="0.6000" ScaleY="0.6000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="Normal" Path="studio/room/components/card.csd" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="poker_2" ActionTag="-1349078290" Tag="122" IconVisible="True" LeftMargin="-35.0000" RightMargin="35.0000" TopMargin="50.0000" BottomMargin="-50.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position X="-35.0000" Y="-50.0000" />
                    <Scale ScaleX="0.6000" ScaleY="0.6000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="Normal" Path="studio/room/components/card.csd" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="90.0000" Y="55.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0000" Y="0.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="use_coin" ActionTag="91455395" Tag="142" IconVisible="False" LeftMargin="24.6604" RightMargin="100.3396" TopMargin="16.0000" BottomMargin="58.0000" LabelText="1000" ctype="TextBMFontObjectData">
                <Size X="55.0000" Y="36.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="52.1604" Y="76.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2898" Y="0.6909" />
                <PreSize X="0.3056" Y="0.3273" />
                <LabelBMFontFile_CNB Type="Normal" Path="studio/room/fonts/gamingMoneyNumber.fnt" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="prepare" ActionTag="639473045" Tag="674" IconVisible="False" LeftMargin="-55.8769" RightMargin="181.8769" TopMargin="4.7450" BottomMargin="31.2550" FlipX="True" ctype="SpriteObjectData">
                <Size X="54.0000" Y="74.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="-28.8769" Y="68.2550" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-0.1604" Y="0.6205" />
                <PreSize X="0.3000" Y="0.6727" />
                <FileData Type="MarkedSubImage" Path="studio/room/images/ui/prepare.png" Plist="studio/room/images/ui.plist" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="chat_node" ActionTag="696997434" Tag="172" IconVisible="True" LeftMargin="90.0000" RightMargin="90.0000" TopMargin="55.0000" BottomMargin="55.0000" ctype="SingleNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <Children>
                  <AbstractNodeData Name="chat_bg" ActionTag="-2141380223" Tag="150" IconVisible="False" LeftMargin="53.9607" RightMargin="-294.9607" TopMargin="-113.9809" BottomMargin="33.9809" FlipX="True" Scale9Enable="True" LeftEage="79" RightEage="79" TopEage="36" BottomEage="36" Scale9OriginX="79" Scale9OriginY="36" Scale9Width="83" Scale9Height="40" ctype="ImageViewObjectData">
                    <Size X="241.0000" Y="80.0000" />
                    <AnchorPoint ScaleX="0.0800" ScaleY="0.1057" />
                    <Position X="73.2407" Y="42.4369" />
                    <Scale ScaleX="0.0100" ScaleY="0.0100" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="MarkedSubImage" Path="studio/room/images/ui/game_liaotianpaopao.png" Plist="studio/room/images/ui.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="90.0000" Y="55.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0000" Y="0.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="opt_node" ActionTag="1801394363" Alpha="0" Tag="171" IconVisible="True" LeftMargin="90.0000" RightMargin="90.0000" TopMargin="75.0000" BottomMargin="35.0000" ctype="SingleNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <Children>
                  <AbstractNodeData Name="opt_bg" ActionTag="-1620520451" Tag="151" IconVisible="False" LeftMargin="64.1425" RightMargin="-144.1425" TopMargin="-59.3703" BottomMargin="-0.6297" Scale9Enable="True" LeftEage="33" RightEage="33" TopEage="23" BottomEage="23" Scale9OriginX="33" Scale9OriginY="23" Scale9Width="36" Scale9Height="26" ctype="ImageViewObjectData">
                    <Size X="80.0000" Y="60.0000" />
                    <AnchorPoint />
                    <Position X="64.1425" Y="-0.6297" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="MarkedSubImage" Path="studio/room/images/ui/game_tishikuang.png" Plist="studio/room/images/ui.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="txt" ActionTag="773738720" Tag="170" IconVisible="False" LeftMargin="82.1414" RightMargin="-122.1414" TopMargin="-49.4310" BottomMargin="26.4310" FontSize="20" LabelText="看牌" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="40.0000" Y="23.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="102.1414" Y="37.9310" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="90.0000" Y="35.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.3182" />
                <PreSize X="0.0000" Y="0.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="MarkedSubImage" Path="studio/room/images/ui/seat_bg.png" Plist="studio/room/images/ui.plist" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>