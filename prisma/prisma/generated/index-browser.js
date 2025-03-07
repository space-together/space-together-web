
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
  created_at: 'created_at',
  updated_at: 'updated_at'
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
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires',
  created_at: 'created_at',
  updated_at: 'updated_at'
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
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SectorScalarFieldEnum = {
  id: 'id',
  education_id: 'education_id',
  username: 'username',
  name: 'name',
  description: 'description',
  symbol: 'symbol',
  disabled: 'disabled',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TradeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  username: 'username',
  description: 'description',
  sector_id: 'sector_id',
  max_classes: 'max_classes',
  min_classes: 'min_classes',
  symbol: 'symbol',
  disabled: 'disabled',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ClassRoomScalarFieldEnum = {
  id: 'id',
  name: 'name',
  username: 'username',
  description: 'description',
  symbol: 'symbol',
  disabled: 'disabled',
  class_room_type: 'class_room_type',
  sector_id: 'sector_id',
  trade_id: 'trade_id',
  code: 'code',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ClassScalarFieldEnum = {
  id: 'id',
  name: 'name',
  username: 'username',
  description: 'description',
  code: 'code',
  symbol: 'symbol',
  disabled: 'disabled',
  sector_id: 'sector_id',
  trade_id: 'trade_id',
  class_room_id: 'class_room_id',
  user_id: 'user_id',
  classType: 'classType',
  students: 'students',
  teachers_ids: 'teachers_ids',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SubClassScalarFieldEnum = {
  id: 'id',
  class_id: 'class_id',
  code: 'code',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.StudentScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  subClass_id: 'subClass_id',
  class_id: 'class_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TeacherScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  classes_ids: 'classes_ids',
  role: 'role',
  Models_ids: 'Models_ids',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SendUserRequestScalarFieldEnum = {
  id: 'id',
  senderId: 'senderId',
  user_id: 'user_id',
  description: 'description',
  class_id: 'class_id',
  email: 'email',
  role: 'role',
  seen: 'seen',
  type: 'type',
  message: 'message',
  accept: 'accept',
  cancel: 'cancel',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  file: 'file',
  content: 'content',
  role: 'role',
  class_id: 'class_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SubjectScalarFieldEnum = {
  id: 'id',
  name: 'name',
  classRoomId: 'classRoomId',
  class_id: 'class_id',
  code: 'code',
  sector_id: 'sector_id',
  trade_id: 'trade_id',
  subjectType: 'subjectType',
  curriculum: 'curriculum',
  copyright: 'copyright',
  learningHours: 'learningHours',
  issueDate: 'issueDate',
  purpose: 'purpose',
  symbol: 'symbol',
  created_at: 'created_at',
  updated_at: 'updated_at',
  teacher_id: 'teacher_id'
};

exports.Prisma.LearningOutcomeScalarFieldEnum = {
  id: 'id',
  Subject_id: 'Subject_id',
  learningHours: 'learningHours',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.IndicativeContentScalarFieldEnum = {
  id: 'id',
  learningOutcomeId: 'learningOutcomeId',
  content: 'content'
};

exports.Prisma.KnowledgeScalarFieldEnum = {
  id: 'id',
  Subject_id: 'Subject_id',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SkillScalarFieldEnum = {
  id: 'id',
  Subject_id: 'Subject_id',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AttitudeScalarFieldEnum = {
  id: 'id',
  Subject_id: 'Subject_id',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ResourceScalarFieldEnum = {
  id: 'id',
  Subject_id: 'Subject_id',
  category: 'category',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CompetenceScalarFieldEnum = {
  id: 'id',
  Subject_id: 'Subject_id',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PerformanceCriteriaScalarFieldEnum = {
  id: 'id',
  competence_id: 'competence_id',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  Subject_id: 'Subject_id',
  type: 'type',
  method: 'method',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.NoteScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  subject_id: 'subject_id',
  module_id: 'module_id',
  seenBy: 'seenBy',
  commentsIds: 'commentsIds',
  fileId: 'fileId',
  content: 'content',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ModuleScalarFieldEnum = {
  id: 'id',
  teacher_id: 'teacher_id',
  subject_id: 'subject_id',
  class_id: 'class_id',
  subClass_id: 'subClass_id',
  user_id: 'user_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
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
  Male: 'Male',
  Female: 'Female',
  Other: 'Other'
};

exports.ClassRoomType = exports.$Enums.ClassRoomType = {
  Default: 'Default',
  Other: 'Other'
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
  TEACHERjOINCLASS: 'TEACHERjOINCLASS',
  STUDENTJOINCLASS: 'STUDENTJOINCLASS'
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
  Module: 'Module'
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
