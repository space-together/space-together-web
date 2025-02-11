
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.3.1
 * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
 */
Prisma.prismaVersion = {
  client: "6.3.1",
  engine: "acc0b9dd43eb689cbd20c9470515d719db10d0b0"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  role: 'role',
  password: 'password',
  username: 'username',
  bio: 'bio',
  age: 'age',
  disabled: 'disabled',
  gender: 'gender',
  phone: 'phone',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.AuthenticatorScalarFieldEnum = {
  credentialID: 'credentialID',
  userId: 'userId',
  providerAccountId: 'providerAccountId',
  credentialPublicKey: 'credentialPublicKey',
  counter: 'counter',
  credentialDeviceType: 'credentialDeviceType',
  credentialBackedUp: 'credentialBackedUp',
  transports: 'transports'
};

exports.Prisma.EducationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  username: 'username',
  description: 'description',
  symbol: 'symbol',
  disabled: 'disabled',
  roles: 'roles',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SectorScalarFieldEnum = {
  id: 'id',
  educationId: 'educationId',
  username: 'username',
  name: 'name',
  description: 'description',
  symbol: 'symbol',
  disabled: 'disabled',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TradeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  username: 'username',
  description: 'description',
  sectorId: 'sectorId',
  limitClasses: 'limitClasses',
  symbol: 'symbol',
  disabled: 'disabled',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClassRoomScalarFieldEnum = {
  id: 'id',
  name: 'name',
  username: 'username',
  description: 'description',
  symbol: 'symbol',
  disabled: 'disabled',
  ClassRoomType: 'ClassRoomType',
  sectorId: 'sectorId',
  tradeId: 'tradeId',
  code: 'code',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClassScalarFieldEnum = {
  id: 'id',
  name: 'name',
  username: 'username',
  description: 'description',
  code: 'code',
  symbol: 'symbol',
  disabled: 'disabled',
  sectorId: 'sectorId',
  tradeId: 'tradeId',
  classRoomId: 'classRoomId',
  userId: 'userId',
  classType: 'classType',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubClassScalarFieldEnum = {
  id: 'id',
  classId: 'classId',
  code: 'code',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  subClassId: 'subClassId',
  classId: 'classId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeacherScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  classId: 'classId',
  role: 'role',
  subjectsIds: 'subjectsIds',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SendUserRequestScalarFieldEnum = {
  id: 'id',
  senderId: 'senderId',
  userId: 'userId',
  description: 'description',
  classId: 'classId',
  email: 'email',
  role: 'role',
  seen: 'seen',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  file: 'file',
  content: 'content',
  role: 'role',
  classId: 'classId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubjectScalarFieldEnum = {
  id: 'id',
  name: 'name',
  classRoomId: 'classRoomId',
  classId: 'classId',
  code: 'code',
  sectorId: 'sectorId',
  tradeId: 'tradeId',
  subjectType: 'subjectType',
  curriculum: 'curriculum',
  copyright: 'copyright',
  learningHours: 'learningHours',
  issueDate: 'issueDate',
  purpose: 'purpose',
  symbol: 'symbol',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LearningOutcomeScalarFieldEnum = {
  id: 'id',
  SubjectId: 'SubjectId',
  learningHours: 'learningHours',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IndicativeContentScalarFieldEnum = {
  id: 'id',
  learningOutcomeId: 'learningOutcomeId',
  content: 'content'
};

exports.Prisma.KnowledgeScalarFieldEnum = {
  id: 'id',
  SubjectId: 'SubjectId',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SkillScalarFieldEnum = {
  id: 'id',
  SubjectId: 'SubjectId',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AttitudeScalarFieldEnum = {
  id: 'id',
  SubjectId: 'SubjectId',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ResourceScalarFieldEnum = {
  id: 'id',
  SubjectId: 'SubjectId',
  category: 'category',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompetenceScalarFieldEnum = {
  id: 'id',
  SubjectId: 'SubjectId',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PerformanceCriteriaScalarFieldEnum = {
  id: 'id',
  competenceId: 'competenceId',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  SubjectId: 'SubjectId',
  type: 'type',
  method: 'method',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NoteScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  subjectId: 'subjectId',
  seenBy: 'seenBy',
  commentsIds: 'commentsIds',
  fileId: 'fileId',
  content: 'content',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ModelScalarFieldEnum = {
  id: 'id',
  teacherId: 'teacherId',
  subjectId: 'subjectId',
  classId: 'classId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.UserRole = exports.$Enums.UserRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  SCHOOLSTAFF: 'SCHOOLSTAFF',
  ADMIN: 'ADMIN',
  PARENT: 'PARENT'
};

exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.ClassRoomType = exports.$Enums.ClassRoomType = {
  DEFAULT: 'DEFAULT',
  OTHER: 'OTHER'
};

exports.ClassType = exports.$Enums.ClassType = {
  SCHOOLCLASS: 'SCHOOLCLASS',
  PRIVET: 'PRIVET',
  PUBLIC: 'PUBLIC'
};

exports.TeacherROLE = exports.$Enums.TeacherROLE = {
  CLASSTEACHER: 'CLASSTEACHER',
  TEACHER: 'TEACHER'
};

exports.SendUserRequestType = exports.$Enums.SendUserRequestType = {
  JOINCLASS: 'JOINCLASS',
  TEACHERjOINCLASS: 'TEACHERjOINCLASS'
};

exports.PostRole = exports.$Enums.PostRole = {
  NOTES: 'NOTES',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  POST: 'POST',
  ACTIVITY: 'ACTIVITY',
  TEXT: 'TEXT'
};

exports.SubjectType = exports.$Enums.SubjectType = {
  GENERAL: 'GENERAL'
};

exports.ResourceType = exports.$Enums.ResourceType = {
  EQUIPMENT: 'EQUIPMENT',
  MATERIAL: 'MATERIAL',
  TOOLS: 'TOOLS'
};

exports.AssessmentType = exports.$Enums.AssessmentType = {
  FORMATIVE: 'FORMATIVE',
  SUMMATIVE: 'SUMMATIVE'
};

exports.Prisma.ModelName = {
  User: 'User',
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken',
  Authenticator: 'Authenticator',
  Education: 'Education',
  Sector: 'Sector',
  Trade: 'Trade',
  ClassRoom: 'ClassRoom',
  Class: 'Class',
  SubClass: 'SubClass',
  Student: 'Student',
  Teacher: 'Teacher',
  SendUserRequest: 'SendUserRequest',
  Post: 'Post',
  Subject: 'Subject',
  LearningOutcome: 'LearningOutcome',
  IndicativeContent: 'IndicativeContent',
  Knowledge: 'Knowledge',
  Skill: 'Skill',
  Attitude: 'Attitude',
  Resource: 'Resource',
  Competence: 'Competence',
  PerformanceCriteria: 'PerformanceCriteria',
  Assessment: 'Assessment',
  Note: 'Note',
  Model: 'Model'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
