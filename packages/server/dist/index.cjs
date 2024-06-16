"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/app.ts
var import_express = __toESM(require("express"), 1);
var import_express2 = require("@trpc/server/adapters/express");
var import_cors = __toESM(require("cors"), 1);

// src/trpc/index.ts
var import_server = require("@trpc/server");
var import_superjson = __toESM(require("superjson"), 1);
var import_zod = require("zod");
var import_zod_validation_error = require("zod-validation-error");
var t = import_server.initTRPC.context().create({
  transformer: import_superjson.default,
  errorFormatter(opts) {
    const { shape, error } = opts;
    if (error.cause instanceof import_zod.ZodError) {
      const validationError = (0, import_zod_validation_error.fromZodError)(error.cause);
      return {
        ...shape,
        data: {
          message: validationError.message
        }
      };
    }
    return shape;
  }
});
var {
  middleware,
  router,
  procedure: publicProcedure,
  createCallerFactory,
  mergeRouters
} = t;

// src/modules/user/signup/index.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);

// src/entities/index.ts
var entities_exports = {};
__export(entities_exports, {
  Issue: () => Issue,
  Project: () => Project,
  Status: () => Status,
  User: () => User,
  Workflow: () => Workflow,
  WorkflowStatus: () => WorkflowStatus,
  WorkflowTransition: () => WorkflowTransition
});

// src/entities/User.ts
var import_typeorm7 = require("typeorm");
var import_class_validator = require("class-validator");
var import_zod8 = require("zod");

// src/utils/validation.ts
var import_zod2 = require("zod");
function validates() {
  return {
    with: (schema2) => import_zod2.z.object(schema2)
  };
}

// src/entities/Project.ts
var import_typeorm6 = require("typeorm");
var import_zod7 = require("zod");

// src/entities/Workflow.ts
var import_typeorm5 = require("typeorm");
var import_zod6 = require("zod");

// src/entities/WorkflowStatus.ts
var import_typeorm4 = require("typeorm");
var import_zod5 = require("zod");

// src/entities/Issue.ts
var import_typeorm = require("typeorm");
var import_zod3 = require("zod");
var Issue = class {
  id;
  title;
  description;
  workflowStatus;
  reporter;
  assignees;
  project;
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("increment")
], Issue.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)("text")
], Issue.prototype, "title", 2);
__decorateClass([
  (0, import_typeorm.Column)("text")
], Issue.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm.ManyToOne)(() => WorkflowStatus, (workflowStatus) => workflowStatus.issues)
], Issue.prototype, "workflowStatus", 2);
__decorateClass([
  (0, import_typeorm.ManyToOne)(() => User, (user) => user.createdIssues)
], Issue.prototype, "reporter", 2);
__decorateClass([
  (0, import_typeorm.ManyToMany)(() => User, (user) => user.assignedIssues)
], Issue.prototype, "assignees", 2);
__decorateClass([
  (0, import_typeorm.ManyToOne)(() => Project, (project) => project.issues)
], Issue.prototype, "project", 2);
Issue = __decorateClass([
  (0, import_typeorm.Entity)()
], Issue);
var issueSchema = validates().with({
  id: import_zod3.z.number().int().positive(),
  title: import_zod3.z.string().trim().min(1).max(20),
  description: import_zod3.z.string().trim().min(1).max(255)
});
var issueInsertSchema = issueSchema.omit({ id: true });

// src/entities/Status.ts
var import_typeorm3 = require("typeorm");
var import_zod4 = require("zod");

// src/entities/WorkflowTransition.ts
var import_typeorm2 = require("typeorm");
var WorkflowTransition = class {
  id;
  workflow;
  fromStatus;
  toStatus;
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("increment")
], WorkflowTransition.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.ManyToOne)(() => Workflow, (workflow) => workflow.transitions)
], WorkflowTransition.prototype, "workflow", 2);
__decorateClass([
  (0, import_typeorm2.ManyToOne)(() => Status, (status) => status.fromTransitions)
], WorkflowTransition.prototype, "fromStatus", 2);
__decorateClass([
  (0, import_typeorm2.ManyToOne)(() => Status, (status) => status.toTransitions)
], WorkflowTransition.prototype, "toStatus", 2);
WorkflowTransition = __decorateClass([
  (0, import_typeorm2.Entity)()
], WorkflowTransition);

// src/entities/Status.ts
var Status = class {
  id;
  name;
  workflowStatuses;
  fromTransitions;
  toTransitions;
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("increment")
], Status.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)("text")
], Status.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(() => WorkflowStatus, (workflowStatus) => workflowStatus.status)
], Status.prototype, "workflowStatuses", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(
    () => WorkflowTransition,
    (workflowTransition) => workflowTransition.fromStatus
  )
], Status.prototype, "fromTransitions", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(
    () => WorkflowTransition,
    (workflowTransition) => workflowTransition.toStatus
  )
], Status.prototype, "toTransitions", 2);
Status = __decorateClass([
  (0, import_typeorm3.Entity)()
], Status);
var statusSchema = validates().with({
  id: import_zod4.z.number().int().positive(),
  name: import_zod4.z.string().min(1).max(20)
});
var statusInsertSchema = statusSchema.omit({ id: true });

// src/entities/WorkflowStatus.ts
var WorkflowStatus = class {
  id;
  workflow;
  issues;
  status;
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)("increment")
], WorkflowStatus.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => Workflow, (workflow) => workflow.statuses)
], WorkflowStatus.prototype, "workflow", 2);
__decorateClass([
  (0, import_typeorm4.OneToMany)(() => Issue, (issue) => issue.workflowStatus)
], WorkflowStatus.prototype, "issues", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => Status, (status) => status.workflowStatuses)
], WorkflowStatus.prototype, "status", 2);
WorkflowStatus = __decorateClass([
  (0, import_typeorm4.Entity)()
], WorkflowStatus);
var workflowStatusSchema = validates().with({
  id: import_zod5.z.number().int().positive()
});

// src/entities/Workflow.ts
var Workflow = class {
  id;
  name;
  projects;
  statuses;
  transitions;
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)("increment")
], Workflow.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.Column)("text", { unique: true })
], Workflow.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => Project, (project) => project.workflow)
], Workflow.prototype, "projects", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => WorkflowStatus, (workflowStatus) => workflowStatus.workflow)
], Workflow.prototype, "statuses", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(
    () => WorkflowTransition,
    (workflowTransition) => workflowTransition.workflow
  )
], Workflow.prototype, "transitions", 2);
Workflow = __decorateClass([
  (0, import_typeorm5.Entity)()
], Workflow);
var workflowSchema = validates().with({
  id: import_zod6.z.number().int().positive(),
  name: import_zod6.z.string().trim().min(2, "Workflow name must be at least 1 character long").max(100)
});
var workflowInsertSchema = workflowSchema.omit({ id: true });

// src/entities/Project.ts
var Project = class {
  id;
  name;
  workflow;
  users;
  issues;
};
__decorateClass([
  (0, import_typeorm6.PrimaryGeneratedColumn)("increment")
], Project.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm6.Column)("text")
], Project.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => Workflow, (workflow) => workflow.projects)
], Project.prototype, "workflow", 2);
__decorateClass([
  (0, import_typeorm6.ManyToMany)(() => User, { cascade: ["insert", "update"] }),
  (0, import_typeorm6.JoinTable)({
    name: "project_users",
    joinColumn: {
      name: "project_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
], Project.prototype, "users", 2);
__decorateClass([
  (0, import_typeorm6.OneToMany)(() => Issue, (issue) => issue.project)
], Project.prototype, "issues", 2);
Project = __decorateClass([
  (0, import_typeorm6.Entity)()
], Project);
var projectSchema = validates().with({
  id: import_zod7.z.number().int().positive(),
  name: import_zod7.z.string().trim().min(1, "Project name must be at least 1 character long").max(20)
});
var projectInsertSchema = projectSchema.omit({ id: true });

// src/entities/User.ts
var User = class {
  id;
  email;
  password;
  projects;
  createdIssues;
  assignedIssues;
};
__decorateClass([
  (0, import_typeorm7.PrimaryGeneratedColumn)("increment")
], User.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm7.Column)("text", { unique: true }),
  (0, import_class_validator.IsEmail)()
], User.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm7.Column)("text", { select: false })
], User.prototype, "password", 2);
__decorateClass([
  (0, import_typeorm7.ManyToMany)(() => Project, { cascade: ["insert", "update"] }),
  (0, import_typeorm7.JoinTable)({
    name: "project_users",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "project_id",
      referencedColumnName: "id"
    }
  })
], User.prototype, "projects", 2);
__decorateClass([
  (0, import_typeorm7.OneToMany)(() => Issue, (issue) => issue.reporter)
], User.prototype, "createdIssues", 2);
__decorateClass([
  (0, import_typeorm7.ManyToMany)(() => Issue, (issue) => issue.assignees)
], User.prototype, "assignedIssues", 2);
User = __decorateClass([
  (0, import_typeorm7.Entity)()
], User);
var userSchema = validates().with({
  id: import_zod8.z.number().int().positive(),
  email: import_zod8.z.string().trim().toLowerCase().email(),
  password: import_zod8.z.string().min(8).max(64)
});
var userInsertSchema = userSchema.omit({ id: true });
var authUserSchema = validates().with({
  id: import_zod8.z.number().int().positive()
});

// src/config.ts
var import_config = require("dotenv/config");
var import_zod9 = __toESM(require("zod"), 1);
var { env } = process;
if (!env.NODE_ENV) env.NODE_ENV = "development";
var isTest = env.NODE_ENV === "test";
var isDevTest = env.NODE_ENV === "development" || isTest;
var isInMemory = env.DB_TYPE === "pg-mem";
var schema = import_zod9.default.object({
  env: import_zod9.default.enum(["development", "production", "staging", "test"]).default("development"),
  isCi: import_zod9.default.boolean().default(false),
  port: import_zod9.default.coerce.number().default(8080),
  auth: import_zod9.default.object({
    tokenKey: import_zod9.default.string().default(() => {
      if (isDevTest) {
        return "";
      }
      throw new Error("You must provide a token key in production env!");
    }),
    expiresIn: import_zod9.default.string().default("7d"),
    passwordCost: import_zod9.default.coerce.number().default(isDevTest ? 6 : 12)
  }),
  database: import_zod9.default.object({
    type: import_zod9.default.enum(["postgres", "pg-mem"]).default("postgres"),
    host: import_zod9.default.string().default("localhost"),
    port: import_zod9.default.coerce.number().default(5432),
    database: isInMemory ? import_zod9.default.string().optional() : import_zod9.default.string(),
    username: isInMemory ? import_zod9.default.string().optional() : import_zod9.default.string(),
    password: isInMemory ? import_zod9.default.string().optional() : import_zod9.default.string(),
    logging: import_zod9.default.preprocess(coerceBoolean, import_zod9.default.boolean().default(isDevTest)),
    synchronize: import_zod9.default.preprocess(coerceBoolean, import_zod9.default.boolean().default(isDevTest))
  })
}).readonly();
var config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,
  isCi: env.CI,
  auth: {
    tokenKey: env.TOKEN_KEY,
    expiresIn: env.TOKEN_EXPIRES_IN,
    passwordCost: env.PASSWORD_COST
  },
  database: {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    logging: env.DB_LOGGING,
    synchronize: env.DB_SYNC
  }
});
var config_default = config;
function coerceBoolean(value) {
  if (typeof value === "string") {
    return value === "true" || value === "1";
  }
  return void 0;
}

// src/modules/user/signup/index.ts
var import_server2 = require("@trpc/server");
var signup_default = publicProcedure.input(
  userSchema.pick({
    email: true,
    password: true
  })
).mutation(async ({ input: { email, password }, ctx: { db } }) => {
  const hash = await import_bcrypt.default.hash(password, config_default.auth.passwordCost);
  try {
    const user = await db.getRepository(User).save({
      email,
      password: hash
    });
    return {
      id: user.id,
      email: user.email
    };
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }
    if (error.message.includes("duplicate key")) {
      throw new import_server2.TRPCError({
        code: "BAD_REQUEST",
        message: "User with this email already exists"
      });
    }
    throw error;
  }
});

// src/modules/user/login/index.ts
var import_bcrypt2 = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_server3 = require("@trpc/server");

// src/modules/user/tokenPayload.ts
var import_zod10 = __toESM(require("zod"), 1);
var tokenPayloadSchema = import_zod10.default.object({
  user: import_zod10.default.object({
    id: import_zod10.default.number()
  })
});
function prepareTokenPayload(user) {
  return tokenPayloadSchema.parse({ user });
}

// src/modules/user/login/index.ts
var { expiresIn, tokenKey } = config_default.auth;
var login_default = publicProcedure.input(
  userSchema.pick({
    email: true,
    password: true
  })
).mutation(async ({ input: { email, password }, ctx: { db } }) => {
  const user = await db.getRepository(User).findOne({
    select: {
      id: true,
      password: true
    },
    where: {
      email
    }
  });
  if (!user) {
    throw new import_server3.TRPCError({
      code: "UNAUTHORIZED",
      message: "We could not find an account with this email address"
    });
  }
  const passwordMatch = await import_bcrypt2.default.compare(password, user.password);
  if (!passwordMatch) {
    throw new import_server3.TRPCError({
      code: "UNAUTHORIZED",
      message: "Incorrect password. Try again."
    });
  }
  const payload = prepareTokenPayload(user);
  const accessToken = import_jsonwebtoken.default.sign(payload, tokenKey, {
    expiresIn
  });
  return {
    accessToken
  };
});

// src/modules/user/index.ts
var user_default = router({
  signup: signup_default,
  login: login_default
});

// src/modules/project/create/index.ts
var import_server4 = require("@trpc/server");
var create_default = publicProcedure.input(projectInsertSchema).mutation(async ({ input: projectData, ctx: { db } }) => {
  const workflow = await db.getRepository(Workflow).findOne({ where: { name: "Default" } });
  if (!workflow) {
    throw new import_server4.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Default workflow does not exist."
    });
  }
  const project = await db.getRepository(Project).create({
    ...projectData,
    workflow
  });
  const projectCreated = await db.getRepository(Project).save(project);
  return projectCreated;
});

// src/trpc/authenticatedProcedure/index.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);

// src/trpc/authenticatedProcedure/buildAuthenticatedProcedure.ts
var import_zod11 = require("zod");
var import_server5 = require("@trpc/server");
var tokenSchema = import_zod11.z.object({
  user: authUserSchema
});
function buildAuthenticatedProcedure(verify) {
  function getUserFromToken(token) {
    try {
      const tokenVerified = verify(token);
      const tokenParsed = tokenSchema.parse(tokenVerified);
      return tokenParsed.user;
    } catch (error) {
      return null;
    }
  }
  return publicProcedure.use(({ ctx, next }) => {
    if (ctx.authUser) {
      return next({
        ctx: {
          authUser: ctx.authUser
        }
      });
    }
    if (!ctx.req) {
      throw new import_server5.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Missing Express request object"
      });
    }
    const token = ctx.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new import_server5.TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthenticated. Please log in."
      });
    }
    const authUser = getUserFromToken(token);
    if (!authUser) {
      throw new import_server5.TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token."
      });
    }
    return next({
      ctx: {
        authUser
      }
    });
  });
}

// src/trpc/authenticatedProcedure/index.ts
var { tokenKey: tokenKey2 } = config_default.auth;
var verifyToken = (token) => import_jsonwebtoken2.default.verify(token, tokenKey2);
var authenticatedProcedure = buildAuthenticatedProcedure(verifyToken);

// src/modules/project/find/index.ts
var find_default = authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    const projects = await db.getRepository(Project).find({
      relations: ["users"],
      where: {
        users: { id: authUser.id }
      },
      order: { id: "ASC" }
    });
    return projects;
  }
);

// src/modules/project/get/index.ts
var import_server6 = require("@trpc/server");
var get_default = publicProcedure.input(projectSchema.shape.id).query(async ({ input: projectId, ctx: { db } }) => {
  const project = await db.getRepository(Project).findOne({
    where: { id: projectId },
    relations: [
      "issues",
      "workflow",
      "workflow.statuses",
      "workflow.statuses.status"
    ]
  });
  if (!project) {
    throw new import_server6.TRPCError({
      code: "NOT_FOUND",
      message: `Project was not found`
    });
  }
  return project;
});

// src/modules/project/getAllByUser/index.ts
var getAllByUser_default = publicProcedure.query(async ({ ctx: { db } }) => {
  const projects = await db.getRepository(Project).find();
  return projects;
});

// src/modules/project/index.ts
var project_default = router({
  create: create_default,
  find: find_default,
  get: get_default,
  getAllByUser: getAllByUser_default
});

// src/modules/workflow/create/index.ts
var create_default2 = publicProcedure.input(workflowInsertSchema).mutation(async ({ input: workflowData, ctx: { db } }) => {
  const workflow = {
    ...workflowData
  };
  const workflowCreated = await db.getRepository(Workflow).save(workflow);
  return workflowCreated;
});

// src/modules/workflow/find/index.ts
var find_default2 = publicProcedure.query(async ({ ctx: { db } }) => {
  const workflows = await db.getRepository(Workflow).find({
    order: { id: "ASC" }
  });
  return workflows;
});

// src/modules/workflow/get/index.ts
var import_server7 = require("@trpc/server");
var get_default2 = publicProcedure.input(workflowSchema.shape.id).query(async ({ input: workflowId, ctx: { db } }) => {
  const workflow = await db.getRepository(Workflow).findOne({
    where: { id: workflowId }
  });
  if (!workflow) {
    throw new import_server7.TRPCError({
      code: "NOT_FOUND",
      message: `Workflow was not found`
    });
  }
  return workflow;
});

// src/modules/workflow/index.ts
var workflow_default = router({
  create: create_default2,
  find: find_default2,
  get: get_default2
});

// src/modules/issue/create/index.ts
var import_zod12 = __toESM(require("zod"), 1);
var import_server8 = require("@trpc/server");
var issueInputSchema = import_zod12.default.object({
  projectId: projectSchema.shape.id,
  workflowStatusId: workflowStatusSchema.shape.id,
  issueData: issueInsertSchema
});
var create_default3 = publicProcedure.input(issueInputSchema).mutation(async ({ input, ctx: { db } }) => {
  const project = await db.getRepository(Project).findOne({ where: { id: input.projectId } });
  if (!project) {
    throw new import_server8.TRPCError({
      code: "NOT_FOUND",
      message: "Project not found"
    });
  }
  const workflowStatus = await db.getRepository(WorkflowStatus).findOne({ where: { id: input.workflowStatusId } });
  if (!workflowStatus) {
    throw new import_server8.TRPCError({
      code: "NOT_FOUND",
      message: "Workflow status not found"
    });
  }
  const newIssue = await db.getRepository(Issue).create({
    ...input.issueData,
    project,
    workflowStatus
  });
  const issueCreated = await db.getRepository(Issue).save(newIssue);
  return issueCreated;
});

// src/modules/issue/getAllByProjectId/index.ts
var getAllByProjectId_default = publicProcedure.input(projectSchema.shape.id).query(async ({ input: projectId, ctx: { db } }) => {
  const issues = await db.getRepository(Issue).find({
    where: {
      project: { id: projectId }
    },
    relations: ["project"]
  });
  return issues;
});

// src/modules/issue/find/index.ts
var import_zod13 = require("zod");
var find_default3 = publicProcedure.input(
  import_zod13.z.object({
    projectId: projectSchema.shape.id,
    workflowStatusId: workflowStatusSchema.shape.id
  })
).query(async ({ input, ctx: { db } }) => {
  const issues = db.getRepository(Issue).find({
    relations: ["project"],
    where: {
      workflowStatus: { id: input.workflowStatusId },
      project: { id: input.projectId }
    }
  });
  return issues;
});

// src/modules/issue/index.ts
var issue_default = router({
  create: create_default3,
  find: find_default3,
  getAllByProjectId: getAllByProjectId_default
});

// src/modules/status/create/index.ts
var create_default4 = publicProcedure.input(statusInsertSchema).mutation(async ({ input: statusData, ctx: { db } }) => {
  const status = {
    ...statusData
  };
  const statusCreated = db.getRepository(Status).save(status);
  return statusCreated;
});

// src/modules/status/get/index.ts
var import_server9 = require("@trpc/server");
var get_default3 = publicProcedure.input(statusSchema.shape.id).query(async ({ input: statusId, ctx: { db } }) => {
  const status = await db.getRepository(Status).findOne({
    where: { id: statusId }
  });
  if (!status) {
    throw new import_server9.TRPCError({
      code: "NOT_FOUND",
      message: `Status was not found`
    });
  }
  return status;
});

// src/modules/status/find/index.ts
var find_default4 = publicProcedure.query(async ({ ctx: { db } }) => {
  const workflows = await db.getRepository(Status).find({
    order: { id: "ASC" }
  });
  return workflows;
});

// src/modules/status/index.ts
var status_default = router({
  create: create_default4,
  get: get_default3,
  find: find_default4
});

// src/modules/index.ts
var appRouter = router({
  user: user_default,
  project: project_default,
  workflow: workflow_default,
  issue: issue_default,
  status: status_default
});

// src/app.ts
function createApp(db) {
  const app = (0, import_express.default)();
  app.use((0, import_cors.default)());
  app.use(import_express.default.json());
  app.use("/health", (_, res) => {
    res.status(200).send("OK");
  });
  app.use(
    "/v1/trpc",
    (0, import_express2.createExpressMiddleware)({
      createContext: ({ req, res }) => ({
        db,
        req,
        res
      }),
      router: appRouter
    })
  );
  return app;
}

// src/database/index.ts
var import_path = require("path");
var import_typeorm8 = require("typeorm");
var import_typeorm_naming_strategies = require("typeorm-naming-strategies");
function createDatabase(options = {}) {
  return new import_typeorm8.DataSource({
    entities: entities_exports,
    migrations: [relative("./migrations/**/*.ts")],
    namingStrategy: new import_typeorm_naming_strategies.SnakeNamingStrategy(),
    ...options
  });
}
function relative(...paths) {
  return (0, import_path.join)(__dirname, ...paths);
}

// src/index.ts
var database = createDatabase(config_default.database);
database.initialize().then(() => {
  const app = createApp(database);
  app.listen(config_default.port, () => {
    console.log(`Server is running at http://localhost:${config_default.port}`);
  });
});
//# sourceMappingURL=index.cjs.map