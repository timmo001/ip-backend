;--------------------------------
;Includes

  !include "MUI2.nsh"
  !include "FileFunc.nsh"

;--------------------------------
;General

  ;Name and file
  Name "IP"
  OutFile "..\ip-setup.exe"
  Unicode True

  ;Default installation folder
  InstallDir "$LOCALAPPDATA\IP"

  ;Get installation folder from registry if available
  InstallDirRegKey HKCU "Software\IP" ""

  ;Request application privileges for Windows Vista
  RequestExecutionLevel user

;--------------------------------
;Variables

  Var StartMenuFolder

;--------------------------------
;Interface Settings

  !define MUI_ABORTWARNING

;--------------------------------
;Pages

  !insertmacro MUI_PAGE_LICENSE "..\LICENSE"
  !insertmacro MUI_PAGE_COMPONENTS
  !insertmacro MUI_PAGE_DIRECTORY

  ;Start Menu Folder Page Configuration
  !define MUI_STARTMENUPAGE_REGISTRY_ROOT "HKCU"
  !define MUI_STARTMENUPAGE_REGISTRY_KEY "Software\IP"
  !define MUI_STARTMENUPAGE_REGISTRY_VALUENAME "Start Menu Folder"

  !insertmacro MUI_PAGE_STARTMENU Application $StartMenuFolder

  !insertmacro MUI_PAGE_INSTFILES

  !insertmacro MUI_UNPAGE_CONFIRM
  !insertmacro MUI_UNPAGE_INSTFILES

;--------------------------------
;Languages

  !insertmacro MUI_LANGUAGE "English"

;--------------------------------
;Installer Sections

Section "IP"

  SetOutPath "$INSTDIR"

  ;ADD YOUR OWN FILES HERE...
  File /nonfatal /a /r "..\out\" $INSTDIR

  ;Store installation folder
  WriteRegStr HKCU "Software\IP" "" $INSTDIR

  ;Create uninstaller
  WriteUninstaller "$INSTDIR\uninstall.exe"

  !insertmacro MUI_STARTMENU_WRITE_BEGIN Application

    ;Create shortcuts
    CreateDirectory "$SMPROGRAMS\$StartMenuFolder"
    CreateShortcut "$INSTDIR\IP.lnk" "$INSTDIR\ip.exe" "" "$INSTDIR\ip-circle.ico"
    CreateShortcut "$SMPROGRAMS\$StartMenuFolder\IP.lnk" "$INSTDIR\ip.exe" "" "$INSTDIR\ip-circle.ico"
    CreateShortcut "$SMPROGRAMS\$StartMenuFolder\Uninstall IP.lnk" "$INSTDIR\uninstall.exe"
    CreateShortcut "$DESKTOP\IP.lnk" "$INSTDIR\ip.exe" "" "$INSTDIR\ip-circle.ico"

  !insertmacro MUI_STARTMENU_WRITE_END

SectionEnd

;--------------------------------
;Uninstaller Section

Section "Uninstall"

  ;ADD YOUR OWN FILES HERE...

  Delete "$INSTDIR\uninstall.exe"

  RMDir /r "$INSTDIR"

  !insertmacro MUI_STARTMENU_GETFOLDER Application $StartMenuFolder

  Delete "$SMPROGRAMS\$StartMenuFolder\IP.lnk"
  Delete "$SMPROGRAMS\$StartMenuFolder\Uninstall IP.lnk"
  Delete "$DESKTOP\IP.lnk"
  RMDir "$SMPROGRAMS\$StartMenuFolder"

  DeleteRegKey /ifempty HKCU "Software\IP"

SectionEnd
