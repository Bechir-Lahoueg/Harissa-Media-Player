; Registers Harissa as an *available* handler for media files without claiming
; the default. electron-builder's built-in `fileAssociations` writes the default
; value of HKCU\Software\Classes\.<ext>, which silently overrides whatever the
; user already had; these entries only add Harissa to the "Open with" list and
; leave the choice to Windows, which then offers its own picker.
;
; Two mechanisms are used together, because Windows populates the two halves of
; the "Open with" UI from different places:
;   OpenWithProgids -> the short list on the context menu
;   Applications\<exe>\SupportedTypes -> the full "Choose another app" dialog
;
; SHCTX follows the installer's per-user / per-machine mode, so the same script
; is correct either way.

!macro HarissaProgId ProgId FriendlyName
  WriteRegStr SHCTX "Software\Classes\${ProgId}" "" "${FriendlyName}"
  WriteRegStr SHCTX "Software\Classes\${ProgId}\DefaultIcon" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}",0'
  WriteRegStr SHCTX "Software\Classes\${ProgId}\shell\open" "FriendlyAppName" "${PRODUCT_NAME}"
  WriteRegStr SHCTX "Software\Classes\${ProgId}\shell\open\command" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" "%1"'
!macroend

; Offers the type in both "Open with" surfaces without touching the default.
!macro HarissaOfferFor Extension ProgId
  WriteRegStr SHCTX "Software\Classes\.${Extension}\OpenWithProgids" "${ProgId}" ""
  WriteRegStr SHCTX "Software\Classes\Applications\${APP_EXECUTABLE_FILENAME}\SupportedTypes" ".${Extension}" ""
!macroend

!macro HarissaWithdrawFor Extension ProgId
  DeleteRegValue SHCTX "Software\Classes\.${Extension}\OpenWithProgids" "${ProgId}"
!macroend

!macro customInstall
  ; The application itself, which drives the "Choose another app" dialog.
  WriteRegStr SHCTX "Software\Classes\Applications\${APP_EXECUTABLE_FILENAME}" "FriendlyAppName" "${PRODUCT_NAME}"
  WriteRegStr SHCTX "Software\Classes\Applications\${APP_EXECUTABLE_FILENAME}\DefaultIcon" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}",0'
  WriteRegStr SHCTX "Software\Classes\Applications\${APP_EXECUTABLE_FILENAME}\shell\open\command" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" "%1"'

  !insertmacro HarissaProgId "Harissa.Video" "Video file"
  !insertmacro HarissaProgId "Harissa.Audio" "Audio file"

  !insertmacro HarissaOfferFor "mp4"  "Harissa.Video"
  !insertmacro HarissaOfferFor "m4v"  "Harissa.Video"
  !insertmacro HarissaOfferFor "mkv"  "Harissa.Video"
  !insertmacro HarissaOfferFor "webm" "Harissa.Video"
  !insertmacro HarissaOfferFor "mov"  "Harissa.Video"
  !insertmacro HarissaOfferFor "avi"  "Harissa.Video"
  !insertmacro HarissaOfferFor "ogv"  "Harissa.Video"

  !insertmacro HarissaOfferFor "mp3"  "Harissa.Audio"
  !insertmacro HarissaOfferFor "m4a"  "Harissa.Audio"
  !insertmacro HarissaOfferFor "aac"  "Harissa.Audio"
  !insertmacro HarissaOfferFor "wav"  "Harissa.Audio"
  !insertmacro HarissaOfferFor "flac" "Harissa.Audio"
  !insertmacro HarissaOfferFor "ogg"  "Harissa.Audio"
  !insertmacro HarissaOfferFor "oga"  "Harissa.Audio"
  !insertmacro HarissaOfferFor "opus" "Harissa.Audio"
  !insertmacro HarissaOfferFor "weba" "Harissa.Audio"

  ; Tell Explorer to re-read associations so the entries appear without a logout.
  System::Call 'shell32::SHChangeNotify(i 0x08000000, i 0, i 0, i 0)'
!macroend

!macro customUnInstall
  !insertmacro HarissaWithdrawFor "mp4"  "Harissa.Video"
  !insertmacro HarissaWithdrawFor "m4v"  "Harissa.Video"
  !insertmacro HarissaWithdrawFor "mkv"  "Harissa.Video"
  !insertmacro HarissaWithdrawFor "webm" "Harissa.Video"
  !insertmacro HarissaWithdrawFor "mov"  "Harissa.Video"
  !insertmacro HarissaWithdrawFor "avi"  "Harissa.Video"
  !insertmacro HarissaWithdrawFor "ogv"  "Harissa.Video"

  !insertmacro HarissaWithdrawFor "mp3"  "Harissa.Audio"
  !insertmacro HarissaWithdrawFor "m4a"  "Harissa.Audio"
  !insertmacro HarissaWithdrawFor "aac"  "Harissa.Audio"
  !insertmacro HarissaWithdrawFor "wav"  "Harissa.Audio"
  !insertmacro HarissaWithdrawFor "flac" "Harissa.Audio"
  !insertmacro HarissaWithdrawFor "ogg"  "Harissa.Audio"
  !insertmacro HarissaWithdrawFor "oga"  "Harissa.Audio"
  !insertmacro HarissaWithdrawFor "opus" "Harissa.Audio"
  !insertmacro HarissaWithdrawFor "weba" "Harissa.Audio"

  DeleteRegKey SHCTX "Software\Classes\Harissa.Video"
  DeleteRegKey SHCTX "Software\Classes\Harissa.Audio"
  DeleteRegKey SHCTX "Software\Classes\Applications\${APP_EXECUTABLE_FILENAME}"

  System::Call 'shell32::SHChangeNotify(i 0x08000000, i 0, i 0, i 0)'
!macroend
