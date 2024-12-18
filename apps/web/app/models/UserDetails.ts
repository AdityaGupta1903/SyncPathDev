// import { UserDetails } from '../../../api-users/src/dto/UserDetails.dto';
export interface UserDetails {
    UserId: string
    email: string
    Password: string
    GmailAccessToken: string
    GmailRefreshToken: string
    DriveAccessToken: string
    DriveRefreshToken: string
    SpreadSheetAccessToken: string
    SpreadSheetRefreshToken: string
    isGmailConnected: boolean
    isDriveConnected: boolean
    isSpreadSheetConnected: boolean
    MsgAcknowledged: string[]
  }
  