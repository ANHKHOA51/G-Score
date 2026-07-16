import { IsString, Matches } from 'class-validator';

export class FindOneParamsDto {
  @IsString({ message: 'Số báo danh phải là một chuỗi ký tự.' })
  @Matches(/^\d{8}$/, { message: 'Số báo danh không hợp lệ. SBD phải bao gồm 8 chữ số.' })
  sbd: string;
}

export class GetTopGroupParamsDto {
  @IsString({ message: 'Mã khối phải là một chuỗi ký tự.' })
  @Matches(/^[a-zA-Z]\d{2}$/, { message: 'Mã khối không hợp lệ. Vui lòng nhập đúng định dạng (VD: A00, B00)' })
  groupCode: string;
}
