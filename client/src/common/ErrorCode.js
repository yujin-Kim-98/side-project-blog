
export const ErrorCode = [
    // ROLE
    { code: 'ROLE-0001', message: '권한이 없습니다' },
    { code: 'ROLE-0002', message: '권한이 없습니다' },

    // USER
    { code: 'MEMBER-0001', message: '존재하지 않는 회원입니다' },
    { code: 'MEMBER-0002', message: '이미 존재하는 회원입니다' },
    
    // FILE
    { code: 'FILE-0002', message: '업로드 할 수 없는 파일 형식입니다' },

    // POST
    { code: 'POST-0001', message: '존재하지 않는 게시글입니다', directLink: '/' },

    // JWT
    { code: 'TOKEN-0001', message: '만료된 토큰입니다' },
]


// NOT_FOUND_MEMBER(HttpStatus.BAD_REQUEST,"MEMBER-0001", "Member not found"),
//     EXISTING_MEMBER(HttpStatus.BAD_REQUEST, "MEMBER-0002", "Member that already exists"),

//     // Post
//     NOT_FOUND_POST(HttpStatus.BAD_REQUEST, "POST-0001", "Post not found"),

//     // File : AWS S3
//     AWS_S3_UPLOAD_FAIL(HttpStatus.BAD_REQUEST, "FILE-S3-0001", "AWS S3 File upload fail"),
//     AWS_S3_UPLOAD_VALID(HttpStatus.BAD_REQUEST, "FILE-S3-0002", "File validation"),

//     // Role
//     NOT_HAVE_PERMISSION(HttpStatus.BAD_REQUEST, "ROLE-0001", "You do not have permission"),
//     UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "ROLE-0002", "Unauthorized");

// JWT_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "TOKEN-0001", "Token expired");