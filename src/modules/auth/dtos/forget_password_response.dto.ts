import { ApiResponseProperty } from '@nestjs/swagger';

export class ForgetPasswordResponseDto {
  @ApiResponseProperty({ example: 'User password updated successfully!' })
  message: string;

  @ApiResponseProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1NDhlY2RmLWY5ZjEtNGI5Mi04YzI3LWRlNTJjZWZlOTYxMiIsInVzZXJfcm9sZV9jb2RlIjoiViIsImVtYWlsIjoiYXJpdHJhLnNlbkBjb250ZW50ZXJyYS5jb20iLCJmb3JnZXRQYXNzd29yZElkIjoiOTQ0NmU1YjAtNzA3NS00ZGQ3LWJhZTUtMDRhNTE1NjBjMzY0IiwiaWF0IjoxNzE3MDkzMDU3LCJleHAiOjE3MTcwOTM2NTd9._k4wHUSMnXW1tmW-CgBRh-VygjOhKNyu_xryW4xlk_0',
  })
  token: string;
}
