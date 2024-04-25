import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email']);

export const LicenseKeyScalarFieldEnumSchema = z.enum(['id','maxDevices','expires','issued','updatedAt','language','isActivated','isEnable','userId']);

export const DeviceScalarFieldEnumSchema = z.enum(['id','deviceHwId','deviceName','deviceType','deviceOS','licenseKeyId']);

export const LicenseFeatureScalarFieldEnumSchema = z.enum(['id','name','licenseKeyId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  licenseKey: LicenseKeyWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  licenseKey: z.lazy(() => LicenseKeyWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// LICENSE KEY SCHEMA
/////////////////////////////////////////

export const LicenseKeySchema = z.object({
  id: z.string(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date(),
  updatedAt: z.coerce.date(),
  language: z.string().nullable(),
  isActivated: z.boolean(),
  isEnable: z.boolean(),
  userId: z.string(),
})

export type LicenseKey = z.infer<typeof LicenseKeySchema>

// LICENSE KEY RELATION SCHEMA
//------------------------------------------------------

export type LicenseKeyRelations = {
  features: LicenseFeatureWithRelations[];
  devices: DeviceWithRelations[];
  user: UserWithRelations;
};

export type LicenseKeyWithRelations = z.infer<typeof LicenseKeySchema> & LicenseKeyRelations

export const LicenseKeyWithRelationsSchema: z.ZodType<LicenseKeyWithRelations> = LicenseKeySchema.merge(z.object({
  features: z.lazy(() => LicenseFeatureWithRelationsSchema).array(),
  devices: z.lazy(() => DeviceWithRelationsSchema).array(),
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// DEVICE SCHEMA
/////////////////////////////////////////

export const DeviceSchema = z.object({
  id: z.string(),
  deviceHwId: z.string(),
  deviceName: z.string(),
  deviceType: z.string(),
  deviceOS: z.string(),
  licenseKeyId: z.string(),
})

export type Device = z.infer<typeof DeviceSchema>

// DEVICE RELATION SCHEMA
//------------------------------------------------------

export type DeviceRelations = {
  licenseKey: LicenseKeyWithRelations;
};

export type DeviceWithRelations = z.infer<typeof DeviceSchema> & DeviceRelations

export const DeviceWithRelationsSchema: z.ZodType<DeviceWithRelations> = DeviceSchema.merge(z.object({
  licenseKey: z.lazy(() => LicenseKeyWithRelationsSchema),
}))

/////////////////////////////////////////
// LICENSE FEATURE SCHEMA
/////////////////////////////////////////

export const LicenseFeatureSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  licenseKeyId: z.string(),
})

export type LicenseFeature = z.infer<typeof LicenseFeatureSchema>

// LICENSE FEATURE RELATION SCHEMA
//------------------------------------------------------

export type LicenseFeatureRelations = {
  LicenseKey: LicenseKeyWithRelations;
};

export type LicenseFeatureWithRelations = z.infer<typeof LicenseFeatureSchema> & LicenseFeatureRelations

export const LicenseFeatureWithRelationsSchema: z.ZodType<LicenseFeatureWithRelations> = LicenseFeatureSchema.merge(z.object({
  LicenseKey: z.lazy(() => LicenseKeyWithRelationsSchema),
}))

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  licenseKey: z.union([z.boolean(),z.lazy(() => LicenseKeyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  licenseKey: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  licenseKey: z.union([z.boolean(),z.lazy(() => LicenseKeyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LICENSE KEY
//------------------------------------------------------

export const LicenseKeyIncludeSchema: z.ZodType<Prisma.LicenseKeyInclude> = z.object({
  features: z.union([z.boolean(),z.lazy(() => LicenseFeatureFindManyArgsSchema)]).optional(),
  devices: z.union([z.boolean(),z.lazy(() => DeviceFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LicenseKeyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LicenseKeyArgsSchema: z.ZodType<Prisma.LicenseKeyDefaultArgs> = z.object({
  select: z.lazy(() => LicenseKeySelectSchema).optional(),
  include: z.lazy(() => LicenseKeyIncludeSchema).optional(),
}).strict();

export const LicenseKeyCountOutputTypeArgsSchema: z.ZodType<Prisma.LicenseKeyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LicenseKeyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LicenseKeyCountOutputTypeSelectSchema: z.ZodType<Prisma.LicenseKeyCountOutputTypeSelect> = z.object({
  features: z.boolean().optional(),
  devices: z.boolean().optional(),
}).strict();

export const LicenseKeySelectSchema: z.ZodType<Prisma.LicenseKeySelect> = z.object({
  id: z.boolean().optional(),
  maxDevices: z.boolean().optional(),
  expires: z.boolean().optional(),
  issued: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  language: z.boolean().optional(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  userId: z.boolean().optional(),
  features: z.union([z.boolean(),z.lazy(() => LicenseFeatureFindManyArgsSchema)]).optional(),
  devices: z.union([z.boolean(),z.lazy(() => DeviceFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LicenseKeyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DEVICE
//------------------------------------------------------

export const DeviceIncludeSchema: z.ZodType<Prisma.DeviceInclude> = z.object({
  licenseKey: z.union([z.boolean(),z.lazy(() => LicenseKeyArgsSchema)]).optional(),
}).strict()

export const DeviceArgsSchema: z.ZodType<Prisma.DeviceDefaultArgs> = z.object({
  select: z.lazy(() => DeviceSelectSchema).optional(),
  include: z.lazy(() => DeviceIncludeSchema).optional(),
}).strict();

export const DeviceSelectSchema: z.ZodType<Prisma.DeviceSelect> = z.object({
  id: z.boolean().optional(),
  deviceHwId: z.boolean().optional(),
  deviceName: z.boolean().optional(),
  deviceType: z.boolean().optional(),
  deviceOS: z.boolean().optional(),
  licenseKeyId: z.boolean().optional(),
  licenseKey: z.union([z.boolean(),z.lazy(() => LicenseKeyArgsSchema)]).optional(),
}).strict()

// LICENSE FEATURE
//------------------------------------------------------

export const LicenseFeatureIncludeSchema: z.ZodType<Prisma.LicenseFeatureInclude> = z.object({
  LicenseKey: z.union([z.boolean(),z.lazy(() => LicenseKeyArgsSchema)]).optional(),
}).strict()

export const LicenseFeatureArgsSchema: z.ZodType<Prisma.LicenseFeatureDefaultArgs> = z.object({
  select: z.lazy(() => LicenseFeatureSelectSchema).optional(),
  include: z.lazy(() => LicenseFeatureIncludeSchema).optional(),
}).strict();

export const LicenseFeatureSelectSchema: z.ZodType<Prisma.LicenseFeatureSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  licenseKeyId: z.boolean().optional(),
  LicenseKey: z.union([z.boolean(),z.lazy(() => LicenseKeyArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licenseKey: z.lazy(() => LicenseKeyListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  licenseKey: z.lazy(() => LicenseKeyOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  licenseKey: z.lazy(() => LicenseKeyListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LicenseKeyWhereInputSchema: z.ZodType<Prisma.LicenseKeyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LicenseKeyWhereInputSchema),z.lazy(() => LicenseKeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LicenseKeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LicenseKeyWhereInputSchema),z.lazy(() => LicenseKeyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  maxDevices: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  issued: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  language: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActivated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isEnable: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  features: z.lazy(() => LicenseFeatureListRelationFilterSchema).optional(),
  devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const LicenseKeyOrderByWithRelationInputSchema: z.ZodType<Prisma.LicenseKeyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  maxDevices: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  issued: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  language: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActivated: z.lazy(() => SortOrderSchema).optional(),
  isEnable: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  features: z.lazy(() => LicenseFeatureOrderByRelationAggregateInputSchema).optional(),
  devices: z.lazy(() => DeviceOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const LicenseKeyWhereUniqueInputSchema: z.ZodType<Prisma.LicenseKeyWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => LicenseKeyWhereInputSchema),z.lazy(() => LicenseKeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LicenseKeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LicenseKeyWhereInputSchema),z.lazy(() => LicenseKeyWhereInputSchema).array() ]).optional(),
  maxDevices: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  issued: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  language: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActivated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isEnable: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  features: z.lazy(() => LicenseFeatureListRelationFilterSchema).optional(),
  devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const LicenseKeyOrderByWithAggregationInputSchema: z.ZodType<Prisma.LicenseKeyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  maxDevices: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  issued: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  language: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActivated: z.lazy(() => SortOrderSchema).optional(),
  isEnable: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LicenseKeyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LicenseKeyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LicenseKeyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LicenseKeyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LicenseKeySumOrderByAggregateInputSchema).optional()
}).strict();

export const LicenseKeyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LicenseKeyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LicenseKeyScalarWhereWithAggregatesInputSchema),z.lazy(() => LicenseKeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LicenseKeyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LicenseKeyScalarWhereWithAggregatesInputSchema),z.lazy(() => LicenseKeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  maxDevices: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  issued: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  language: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isActivated: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isEnable: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DeviceWhereInputSchema: z.ZodType<Prisma.DeviceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceHwId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceOS: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licenseKeyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licenseKey: z.union([ z.lazy(() => LicenseKeyRelationFilterSchema),z.lazy(() => LicenseKeyWhereInputSchema) ]).optional(),
}).strict();

export const DeviceOrderByWithRelationInputSchema: z.ZodType<Prisma.DeviceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deviceHwId: z.lazy(() => SortOrderSchema).optional(),
  deviceName: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  deviceOS: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional(),
  licenseKey: z.lazy(() => LicenseKeyOrderByWithRelationInputSchema).optional()
}).strict();

export const DeviceWhereUniqueInputSchema: z.ZodType<Prisma.DeviceWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    deviceHwId_licenseKeyId: z.lazy(() => DeviceDeviceHwIdLicenseKeyIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    deviceHwId_licenseKeyId: z.lazy(() => DeviceDeviceHwIdLicenseKeyIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  deviceHwId_licenseKeyId: z.lazy(() => DeviceDeviceHwIdLicenseKeyIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  deviceHwId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceOS: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licenseKeyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licenseKey: z.union([ z.lazy(() => LicenseKeyRelationFilterSchema),z.lazy(() => LicenseKeyWhereInputSchema) ]).optional(),
}).strict());

export const DeviceOrderByWithAggregationInputSchema: z.ZodType<Prisma.DeviceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deviceHwId: z.lazy(() => SortOrderSchema).optional(),
  deviceName: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  deviceOS: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DeviceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DeviceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DeviceMinOrderByAggregateInputSchema).optional()
}).strict();

export const DeviceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DeviceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema),z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema),z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deviceHwId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deviceName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deviceType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deviceOS: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  licenseKeyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LicenseFeatureWhereInputSchema: z.ZodType<Prisma.LicenseFeatureWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LicenseFeatureWhereInputSchema),z.lazy(() => LicenseFeatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LicenseFeatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LicenseFeatureWhereInputSchema),z.lazy(() => LicenseFeatureWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licenseKeyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  LicenseKey: z.union([ z.lazy(() => LicenseKeyRelationFilterSchema),z.lazy(() => LicenseKeyWhereInputSchema) ]).optional(),
}).strict();

export const LicenseFeatureOrderByWithRelationInputSchema: z.ZodType<Prisma.LicenseFeatureOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional(),
  LicenseKey: z.lazy(() => LicenseKeyOrderByWithRelationInputSchema).optional()
}).strict();

export const LicenseFeatureWhereUniqueInputSchema: z.ZodType<Prisma.LicenseFeatureWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => LicenseFeatureWhereInputSchema),z.lazy(() => LicenseFeatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LicenseFeatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LicenseFeatureWhereInputSchema),z.lazy(() => LicenseFeatureWhereInputSchema).array() ]).optional(),
  licenseKeyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  LicenseKey: z.union([ z.lazy(() => LicenseKeyRelationFilterSchema),z.lazy(() => LicenseKeyWhereInputSchema) ]).optional(),
}).strict());

export const LicenseFeatureOrderByWithAggregationInputSchema: z.ZodType<Prisma.LicenseFeatureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LicenseFeatureCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LicenseFeatureAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LicenseFeatureMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LicenseFeatureMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LicenseFeatureSumOrderByAggregateInputSchema).optional()
}).strict();

export const LicenseFeatureScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LicenseFeatureScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LicenseFeatureScalarWhereWithAggregatesInputSchema),z.lazy(() => LicenseFeatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LicenseFeatureScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LicenseFeatureScalarWhereWithAggregatesInputSchema),z.lazy(() => LicenseFeatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  licenseKeyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  licenseKey: z.lazy(() => LicenseKeyCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  licenseKey: z.lazy(() => LicenseKeyUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseKey: z.lazy(() => LicenseKeyUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseKey: z.lazy(() => LicenseKeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LicenseKeyCreateInputSchema: z.ZodType<Prisma.LicenseKeyCreateInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  features: z.lazy(() => LicenseFeatureCreateNestedManyWithoutLicenseKeyInputSchema).optional(),
  devices: z.lazy(() => DeviceCreateNestedManyWithoutLicenseKeyInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLicenseKeyInputSchema)
}).strict();

export const LicenseKeyUncheckedCreateInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  userId: z.string(),
  features: z.lazy(() => LicenseFeatureUncheckedCreateNestedManyWithoutLicenseKeyInputSchema).optional(),
  devices: z.lazy(() => DeviceUncheckedCreateNestedManyWithoutLicenseKeyInputSchema).optional()
}).strict();

export const LicenseKeyUpdateInputSchema: z.ZodType<Prisma.LicenseKeyUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => LicenseFeatureUpdateManyWithoutLicenseKeyNestedInputSchema).optional(),
  devices: z.lazy(() => DeviceUpdateManyWithoutLicenseKeyNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLicenseKeyNestedInputSchema).optional()
}).strict();

export const LicenseKeyUncheckedUpdateInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => LicenseFeatureUncheckedUpdateManyWithoutLicenseKeyNestedInputSchema).optional(),
  devices: z.lazy(() => DeviceUncheckedUpdateManyWithoutLicenseKeyNestedInputSchema).optional()
}).strict();

export const LicenseKeyCreateManyInputSchema: z.ZodType<Prisma.LicenseKeyCreateManyInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  userId: z.string()
}).strict();

export const LicenseKeyUpdateManyMutationInputSchema: z.ZodType<Prisma.LicenseKeyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LicenseKeyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceCreateInputSchema: z.ZodType<Prisma.DeviceCreateInput> = z.object({
  id: z.string().optional(),
  deviceHwId: z.string(),
  deviceName: z.string(),
  deviceType: z.string(),
  deviceOS: z.string(),
  licenseKey: z.lazy(() => LicenseKeyCreateNestedOneWithoutDevicesInputSchema)
}).strict();

export const DeviceUncheckedCreateInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  deviceHwId: z.string(),
  deviceName: z.string(),
  deviceType: z.string(),
  deviceOS: z.string(),
  licenseKeyId: z.string()
}).strict();

export const DeviceUpdateInputSchema: z.ZodType<Prisma.DeviceUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceHwId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceOS: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseKey: z.lazy(() => LicenseKeyUpdateOneRequiredWithoutDevicesNestedInputSchema).optional()
}).strict();

export const DeviceUncheckedUpdateInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceHwId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceOS: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseKeyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceCreateManyInputSchema: z.ZodType<Prisma.DeviceCreateManyInput> = z.object({
  id: z.string().optional(),
  deviceHwId: z.string(),
  deviceName: z.string(),
  deviceType: z.string(),
  deviceOS: z.string(),
  licenseKeyId: z.string()
}).strict();

export const DeviceUpdateManyMutationInputSchema: z.ZodType<Prisma.DeviceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceHwId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceOS: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceHwId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceOS: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseKeyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LicenseFeatureCreateInputSchema: z.ZodType<Prisma.LicenseFeatureCreateInput> = z.object({
  name: z.string(),
  LicenseKey: z.lazy(() => LicenseKeyCreateNestedOneWithoutFeaturesInputSchema)
}).strict();

export const LicenseFeatureUncheckedCreateInputSchema: z.ZodType<Prisma.LicenseFeatureUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  licenseKeyId: z.string()
}).strict();

export const LicenseFeatureUpdateInputSchema: z.ZodType<Prisma.LicenseFeatureUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  LicenseKey: z.lazy(() => LicenseKeyUpdateOneRequiredWithoutFeaturesNestedInputSchema).optional()
}).strict();

export const LicenseFeatureUncheckedUpdateInputSchema: z.ZodType<Prisma.LicenseFeatureUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseKeyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LicenseFeatureCreateManyInputSchema: z.ZodType<Prisma.LicenseFeatureCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  licenseKeyId: z.string()
}).strict();

export const LicenseFeatureUpdateManyMutationInputSchema: z.ZodType<Prisma.LicenseFeatureUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LicenseFeatureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LicenseFeatureUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseKeyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const LicenseKeyListRelationFilterSchema: z.ZodType<Prisma.LicenseKeyListRelationFilter> = z.object({
  every: z.lazy(() => LicenseKeyWhereInputSchema).optional(),
  some: z.lazy(() => LicenseKeyWhereInputSchema).optional(),
  none: z.lazy(() => LicenseKeyWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const LicenseKeyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LicenseKeyOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const LicenseFeatureListRelationFilterSchema: z.ZodType<Prisma.LicenseFeatureListRelationFilter> = z.object({
  every: z.lazy(() => LicenseFeatureWhereInputSchema).optional(),
  some: z.lazy(() => LicenseFeatureWhereInputSchema).optional(),
  none: z.lazy(() => LicenseFeatureWhereInputSchema).optional()
}).strict();

export const DeviceListRelationFilterSchema: z.ZodType<Prisma.DeviceListRelationFilter> = z.object({
  every: z.lazy(() => DeviceWhereInputSchema).optional(),
  some: z.lazy(() => DeviceWhereInputSchema).optional(),
  none: z.lazy(() => DeviceWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const LicenseFeatureOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LicenseFeatureOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DeviceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseKeyCountOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseKeyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  maxDevices: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  issued: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  isActivated: z.lazy(() => SortOrderSchema).optional(),
  isEnable: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseKeyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseKeyAvgOrderByAggregateInput> = z.object({
  maxDevices: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseKeyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseKeyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  maxDevices: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  issued: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  isActivated: z.lazy(() => SortOrderSchema).optional(),
  isEnable: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseKeyMinOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseKeyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  maxDevices: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  issued: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  isActivated: z.lazy(() => SortOrderSchema).optional(),
  isEnable: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseKeySumOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseKeySumOrderByAggregateInput> = z.object({
  maxDevices: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const LicenseKeyRelationFilterSchema: z.ZodType<Prisma.LicenseKeyRelationFilter> = z.object({
  is: z.lazy(() => LicenseKeyWhereInputSchema).optional(),
  isNot: z.lazy(() => LicenseKeyWhereInputSchema).optional()
}).strict();

export const DeviceDeviceHwIdLicenseKeyIdCompoundUniqueInputSchema: z.ZodType<Prisma.DeviceDeviceHwIdLicenseKeyIdCompoundUniqueInput> = z.object({
  deviceHwId: z.string(),
  licenseKeyId: z.string()
}).strict();

export const DeviceCountOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deviceHwId: z.lazy(() => SortOrderSchema).optional(),
  deviceName: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  deviceOS: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deviceHwId: z.lazy(() => SortOrderSchema).optional(),
  deviceName: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  deviceOS: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceMinOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deviceHwId: z.lazy(() => SortOrderSchema).optional(),
  deviceName: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  deviceOS: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseFeatureCountOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseFeatureCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseFeatureAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseFeatureAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseFeatureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseFeatureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseFeatureMinOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseFeatureMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  licenseKeyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseFeatureSumOrderByAggregateInputSchema: z.ZodType<Prisma.LicenseFeatureSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LicenseKeyCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyCreateWithoutUserInputSchema).array(),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LicenseKeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => LicenseKeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LicenseKeyCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LicenseKeyUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyCreateWithoutUserInputSchema).array(),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LicenseKeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => LicenseKeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LicenseKeyCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const LicenseKeyUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LicenseKeyUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyCreateWithoutUserInputSchema).array(),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LicenseKeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => LicenseKeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LicenseKeyUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LicenseKeyUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LicenseKeyCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LicenseKeyUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LicenseKeyUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LicenseKeyUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LicenseKeyUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LicenseKeyScalarWhereInputSchema),z.lazy(() => LicenseKeyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LicenseKeyUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyCreateWithoutUserInputSchema).array(),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LicenseKeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => LicenseKeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LicenseKeyUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LicenseKeyUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LicenseKeyCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LicenseKeyWhereUniqueInputSchema),z.lazy(() => LicenseKeyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LicenseKeyUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LicenseKeyUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LicenseKeyUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LicenseKeyUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LicenseKeyScalarWhereInputSchema),z.lazy(() => LicenseKeyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LicenseFeatureCreateNestedManyWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureCreateNestedManyWithoutLicenseKeyInput> = z.object({
  create: z.union([ z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema).array(),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LicenseFeatureCreateOrConnectWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureCreateOrConnectWithoutLicenseKeyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LicenseFeatureCreateManyLicenseKeyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DeviceCreateNestedManyWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceCreateNestedManyWithoutLicenseKeyInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutLicenseKeyInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutLicenseKeyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyLicenseKeyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLicenseKeyInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLicenseKeyInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLicenseKeyInputSchema),z.lazy(() => UserUncheckedCreateWithoutLicenseKeyInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLicenseKeyInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const LicenseFeatureUncheckedCreateNestedManyWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureUncheckedCreateNestedManyWithoutLicenseKeyInput> = z.object({
  create: z.union([ z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema).array(),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LicenseFeatureCreateOrConnectWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureCreateOrConnectWithoutLicenseKeyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LicenseFeatureCreateManyLicenseKeyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DeviceUncheckedCreateNestedManyWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateNestedManyWithoutLicenseKeyInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutLicenseKeyInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutLicenseKeyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyLicenseKeyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const LicenseFeatureUpdateManyWithoutLicenseKeyNestedInputSchema: z.ZodType<Prisma.LicenseFeatureUpdateManyWithoutLicenseKeyNestedInput> = z.object({
  create: z.union([ z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema).array(),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LicenseFeatureCreateOrConnectWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureCreateOrConnectWithoutLicenseKeyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LicenseFeatureUpsertWithWhereUniqueWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUpsertWithWhereUniqueWithoutLicenseKeyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LicenseFeatureCreateManyLicenseKeyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LicenseFeatureUpdateWithWhereUniqueWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUpdateWithWhereUniqueWithoutLicenseKeyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LicenseFeatureUpdateManyWithWhereWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUpdateManyWithWhereWithoutLicenseKeyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LicenseFeatureScalarWhereInputSchema),z.lazy(() => LicenseFeatureScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DeviceUpdateManyWithoutLicenseKeyNestedInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithoutLicenseKeyNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutLicenseKeyInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutLicenseKeyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeviceUpsertWithWhereUniqueWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUpsertWithWhereUniqueWithoutLicenseKeyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyLicenseKeyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeviceUpdateWithWhereUniqueWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUpdateWithWhereUniqueWithoutLicenseKeyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeviceUpdateManyWithWhereWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUpdateManyWithWhereWithoutLicenseKeyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutLicenseKeyNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLicenseKeyNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLicenseKeyInputSchema),z.lazy(() => UserUncheckedCreateWithoutLicenseKeyInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLicenseKeyInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLicenseKeyInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLicenseKeyInputSchema),z.lazy(() => UserUpdateWithoutLicenseKeyInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLicenseKeyInputSchema) ]).optional(),
}).strict();

export const LicenseFeatureUncheckedUpdateManyWithoutLicenseKeyNestedInputSchema: z.ZodType<Prisma.LicenseFeatureUncheckedUpdateManyWithoutLicenseKeyNestedInput> = z.object({
  create: z.union([ z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema).array(),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LicenseFeatureCreateOrConnectWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureCreateOrConnectWithoutLicenseKeyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LicenseFeatureUpsertWithWhereUniqueWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUpsertWithWhereUniqueWithoutLicenseKeyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LicenseFeatureCreateManyLicenseKeyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LicenseFeatureWhereUniqueInputSchema),z.lazy(() => LicenseFeatureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LicenseFeatureUpdateWithWhereUniqueWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUpdateWithWhereUniqueWithoutLicenseKeyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LicenseFeatureUpdateManyWithWhereWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUpdateManyWithWhereWithoutLicenseKeyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LicenseFeatureScalarWhereInputSchema),z.lazy(() => LicenseFeatureScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DeviceUncheckedUpdateManyWithoutLicenseKeyNestedInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutLicenseKeyNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutLicenseKeyInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutLicenseKeyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeviceUpsertWithWhereUniqueWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUpsertWithWhereUniqueWithoutLicenseKeyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyLicenseKeyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeviceUpdateWithWhereUniqueWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUpdateWithWhereUniqueWithoutLicenseKeyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeviceUpdateManyWithWhereWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUpdateManyWithWhereWithoutLicenseKeyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LicenseKeyCreateNestedOneWithoutDevicesInputSchema: z.ZodType<Prisma.LicenseKeyCreateNestedOneWithoutDevicesInput> = z.object({
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutDevicesInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutDevicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LicenseKeyCreateOrConnectWithoutDevicesInputSchema).optional(),
  connect: z.lazy(() => LicenseKeyWhereUniqueInputSchema).optional()
}).strict();

export const LicenseKeyUpdateOneRequiredWithoutDevicesNestedInputSchema: z.ZodType<Prisma.LicenseKeyUpdateOneRequiredWithoutDevicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutDevicesInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutDevicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LicenseKeyCreateOrConnectWithoutDevicesInputSchema).optional(),
  upsert: z.lazy(() => LicenseKeyUpsertWithoutDevicesInputSchema).optional(),
  connect: z.lazy(() => LicenseKeyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LicenseKeyUpdateToOneWithWhereWithoutDevicesInputSchema),z.lazy(() => LicenseKeyUpdateWithoutDevicesInputSchema),z.lazy(() => LicenseKeyUncheckedUpdateWithoutDevicesInputSchema) ]).optional(),
}).strict();

export const LicenseKeyCreateNestedOneWithoutFeaturesInputSchema: z.ZodType<Prisma.LicenseKeyCreateNestedOneWithoutFeaturesInput> = z.object({
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutFeaturesInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutFeaturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LicenseKeyCreateOrConnectWithoutFeaturesInputSchema).optional(),
  connect: z.lazy(() => LicenseKeyWhereUniqueInputSchema).optional()
}).strict();

export const LicenseKeyUpdateOneRequiredWithoutFeaturesNestedInputSchema: z.ZodType<Prisma.LicenseKeyUpdateOneRequiredWithoutFeaturesNestedInput> = z.object({
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutFeaturesInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutFeaturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LicenseKeyCreateOrConnectWithoutFeaturesInputSchema).optional(),
  upsert: z.lazy(() => LicenseKeyUpsertWithoutFeaturesInputSchema).optional(),
  connect: z.lazy(() => LicenseKeyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LicenseKeyUpdateToOneWithWhereWithoutFeaturesInputSchema),z.lazy(() => LicenseKeyUpdateWithoutFeaturesInputSchema),z.lazy(() => LicenseKeyUncheckedUpdateWithoutFeaturesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const LicenseKeyCreateWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  features: z.lazy(() => LicenseFeatureCreateNestedManyWithoutLicenseKeyInputSchema).optional(),
  devices: z.lazy(() => DeviceCreateNestedManyWithoutLicenseKeyInputSchema).optional()
}).strict();

export const LicenseKeyUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  features: z.lazy(() => LicenseFeatureUncheckedCreateNestedManyWithoutLicenseKeyInputSchema).optional(),
  devices: z.lazy(() => DeviceUncheckedCreateNestedManyWithoutLicenseKeyInputSchema).optional()
}).strict();

export const LicenseKeyCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LicenseKeyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LicenseKeyCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.LicenseKeyCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LicenseKeyCreateManyUserInputSchema),z.lazy(() => LicenseKeyCreateManyUserInputSchema).array() ]),
}).strict();

export const LicenseKeyUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LicenseKeyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LicenseKeyUpdateWithoutUserInputSchema),z.lazy(() => LicenseKeyUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutUserInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LicenseKeyUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LicenseKeyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LicenseKeyUpdateWithoutUserInputSchema),z.lazy(() => LicenseKeyUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const LicenseKeyUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => LicenseKeyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LicenseKeyUpdateManyMutationInputSchema),z.lazy(() => LicenseKeyUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const LicenseKeyScalarWhereInputSchema: z.ZodType<Prisma.LicenseKeyScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LicenseKeyScalarWhereInputSchema),z.lazy(() => LicenseKeyScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LicenseKeyScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LicenseKeyScalarWhereInputSchema),z.lazy(() => LicenseKeyScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  maxDevices: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  issued: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  language: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActivated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isEnable: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LicenseFeatureCreateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureCreateWithoutLicenseKeyInput> = z.object({
  name: z.string()
}).strict();

export const LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureUncheckedCreateWithoutLicenseKeyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const LicenseFeatureCreateOrConnectWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureCreateOrConnectWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => LicenseFeatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema) ]),
}).strict();

export const LicenseFeatureCreateManyLicenseKeyInputEnvelopeSchema: z.ZodType<Prisma.LicenseFeatureCreateManyLicenseKeyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LicenseFeatureCreateManyLicenseKeyInputSchema),z.lazy(() => LicenseFeatureCreateManyLicenseKeyInputSchema).array() ]),
}).strict();

export const DeviceCreateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceCreateWithoutLicenseKeyInput> = z.object({
  id: z.string().optional(),
  deviceHwId: z.string(),
  deviceName: z.string(),
  deviceType: z.string(),
  deviceOS: z.string()
}).strict();

export const DeviceUncheckedCreateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutLicenseKeyInput> = z.object({
  id: z.string().optional(),
  deviceHwId: z.string(),
  deviceName: z.string(),
  deviceType: z.string(),
  deviceOS: z.string()
}).strict();

export const DeviceCreateOrConnectWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema) ]),
}).strict();

export const DeviceCreateManyLicenseKeyInputEnvelopeSchema: z.ZodType<Prisma.DeviceCreateManyLicenseKeyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DeviceCreateManyLicenseKeyInputSchema),z.lazy(() => DeviceCreateManyLicenseKeyInputSchema).array() ]),
}).strict();

export const UserCreateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.UserCreateWithoutLicenseKeyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string()
}).strict();

export const UserUncheckedCreateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLicenseKeyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string()
}).strict();

export const UserCreateOrConnectWithoutLicenseKeyInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLicenseKeyInputSchema),z.lazy(() => UserUncheckedCreateWithoutLicenseKeyInputSchema) ]),
}).strict();

export const LicenseFeatureUpsertWithWhereUniqueWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureUpsertWithWhereUniqueWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => LicenseFeatureWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LicenseFeatureUpdateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUncheckedUpdateWithoutLicenseKeyInputSchema) ]),
  create: z.union([ z.lazy(() => LicenseFeatureCreateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUncheckedCreateWithoutLicenseKeyInputSchema) ]),
}).strict();

export const LicenseFeatureUpdateWithWhereUniqueWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureUpdateWithWhereUniqueWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => LicenseFeatureWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LicenseFeatureUpdateWithoutLicenseKeyInputSchema),z.lazy(() => LicenseFeatureUncheckedUpdateWithoutLicenseKeyInputSchema) ]),
}).strict();

export const LicenseFeatureUpdateManyWithWhereWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureUpdateManyWithWhereWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => LicenseFeatureScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LicenseFeatureUpdateManyMutationInputSchema),z.lazy(() => LicenseFeatureUncheckedUpdateManyWithoutLicenseKeyInputSchema) ]),
}).strict();

export const LicenseFeatureScalarWhereInputSchema: z.ZodType<Prisma.LicenseFeatureScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LicenseFeatureScalarWhereInputSchema),z.lazy(() => LicenseFeatureScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LicenseFeatureScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LicenseFeatureScalarWhereInputSchema),z.lazy(() => LicenseFeatureScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licenseKeyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const DeviceUpsertWithWhereUniqueWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceUpsertWithWhereUniqueWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DeviceUpdateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutLicenseKeyInputSchema) ]),
  create: z.union([ z.lazy(() => DeviceCreateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutLicenseKeyInputSchema) ]),
}).strict();

export const DeviceUpdateWithWhereUniqueWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceUpdateWithWhereUniqueWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DeviceUpdateWithoutLicenseKeyInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutLicenseKeyInputSchema) ]),
}).strict();

export const DeviceUpdateManyWithWhereWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithWhereWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => DeviceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DeviceUpdateManyMutationInputSchema),z.lazy(() => DeviceUncheckedUpdateManyWithoutLicenseKeyInputSchema) ]),
}).strict();

export const DeviceScalarWhereInputSchema: z.ZodType<Prisma.DeviceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceHwId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deviceOS: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licenseKeyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserUpsertWithoutLicenseKeyInputSchema: z.ZodType<Prisma.UserUpsertWithoutLicenseKeyInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLicenseKeyInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLicenseKeyInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLicenseKeyInputSchema),z.lazy(() => UserUncheckedCreateWithoutLicenseKeyInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLicenseKeyInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLicenseKeyInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLicenseKeyInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLicenseKeyInputSchema) ]),
}).strict();

export const UserUpdateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.UserUpdateWithoutLicenseKeyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLicenseKeyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LicenseKeyCreateWithoutDevicesInputSchema: z.ZodType<Prisma.LicenseKeyCreateWithoutDevicesInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  features: z.lazy(() => LicenseFeatureCreateNestedManyWithoutLicenseKeyInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLicenseKeyInputSchema)
}).strict();

export const LicenseKeyUncheckedCreateWithoutDevicesInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedCreateWithoutDevicesInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  userId: z.string(),
  features: z.lazy(() => LicenseFeatureUncheckedCreateNestedManyWithoutLicenseKeyInputSchema).optional()
}).strict();

export const LicenseKeyCreateOrConnectWithoutDevicesInputSchema: z.ZodType<Prisma.LicenseKeyCreateOrConnectWithoutDevicesInput> = z.object({
  where: z.lazy(() => LicenseKeyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutDevicesInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutDevicesInputSchema) ]),
}).strict();

export const LicenseKeyUpsertWithoutDevicesInputSchema: z.ZodType<Prisma.LicenseKeyUpsertWithoutDevicesInput> = z.object({
  update: z.union([ z.lazy(() => LicenseKeyUpdateWithoutDevicesInputSchema),z.lazy(() => LicenseKeyUncheckedUpdateWithoutDevicesInputSchema) ]),
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutDevicesInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutDevicesInputSchema) ]),
  where: z.lazy(() => LicenseKeyWhereInputSchema).optional()
}).strict();

export const LicenseKeyUpdateToOneWithWhereWithoutDevicesInputSchema: z.ZodType<Prisma.LicenseKeyUpdateToOneWithWhereWithoutDevicesInput> = z.object({
  where: z.lazy(() => LicenseKeyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LicenseKeyUpdateWithoutDevicesInputSchema),z.lazy(() => LicenseKeyUncheckedUpdateWithoutDevicesInputSchema) ]),
}).strict();

export const LicenseKeyUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.LicenseKeyUpdateWithoutDevicesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => LicenseFeatureUpdateManyWithoutLicenseKeyNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLicenseKeyNestedInputSchema).optional()
}).strict();

export const LicenseKeyUncheckedUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedUpdateWithoutDevicesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => LicenseFeatureUncheckedUpdateManyWithoutLicenseKeyNestedInputSchema).optional()
}).strict();

export const LicenseKeyCreateWithoutFeaturesInputSchema: z.ZodType<Prisma.LicenseKeyCreateWithoutFeaturesInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  devices: z.lazy(() => DeviceCreateNestedManyWithoutLicenseKeyInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLicenseKeyInputSchema)
}).strict();

export const LicenseKeyUncheckedCreateWithoutFeaturesInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedCreateWithoutFeaturesInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional(),
  userId: z.string(),
  devices: z.lazy(() => DeviceUncheckedCreateNestedManyWithoutLicenseKeyInputSchema).optional()
}).strict();

export const LicenseKeyCreateOrConnectWithoutFeaturesInputSchema: z.ZodType<Prisma.LicenseKeyCreateOrConnectWithoutFeaturesInput> = z.object({
  where: z.lazy(() => LicenseKeyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutFeaturesInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutFeaturesInputSchema) ]),
}).strict();

export const LicenseKeyUpsertWithoutFeaturesInputSchema: z.ZodType<Prisma.LicenseKeyUpsertWithoutFeaturesInput> = z.object({
  update: z.union([ z.lazy(() => LicenseKeyUpdateWithoutFeaturesInputSchema),z.lazy(() => LicenseKeyUncheckedUpdateWithoutFeaturesInputSchema) ]),
  create: z.union([ z.lazy(() => LicenseKeyCreateWithoutFeaturesInputSchema),z.lazy(() => LicenseKeyUncheckedCreateWithoutFeaturesInputSchema) ]),
  where: z.lazy(() => LicenseKeyWhereInputSchema).optional()
}).strict();

export const LicenseKeyUpdateToOneWithWhereWithoutFeaturesInputSchema: z.ZodType<Prisma.LicenseKeyUpdateToOneWithWhereWithoutFeaturesInput> = z.object({
  where: z.lazy(() => LicenseKeyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LicenseKeyUpdateWithoutFeaturesInputSchema),z.lazy(() => LicenseKeyUncheckedUpdateWithoutFeaturesInputSchema) ]),
}).strict();

export const LicenseKeyUpdateWithoutFeaturesInputSchema: z.ZodType<Prisma.LicenseKeyUpdateWithoutFeaturesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUpdateManyWithoutLicenseKeyNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLicenseKeyNestedInputSchema).optional()
}).strict();

export const LicenseKeyUncheckedUpdateWithoutFeaturesInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedUpdateWithoutFeaturesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUncheckedUpdateManyWithoutLicenseKeyNestedInputSchema).optional()
}).strict();

export const LicenseKeyCreateManyUserInputSchema: z.ZodType<Prisma.LicenseKeyCreateManyUserInput> = z.object({
  id: z.string().optional(),
  maxDevices: z.number().int(),
  expires: z.coerce.date(),
  issued: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  language: z.string().optional().nullable(),
  isActivated: z.boolean().optional(),
  isEnable: z.boolean().optional()
}).strict();

export const LicenseKeyUpdateWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => LicenseFeatureUpdateManyWithoutLicenseKeyNestedInputSchema).optional(),
  devices: z.lazy(() => DeviceUpdateManyWithoutLicenseKeyNestedInputSchema).optional()
}).strict();

export const LicenseKeyUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => LicenseFeatureUncheckedUpdateManyWithoutLicenseKeyNestedInputSchema).optional(),
  devices: z.lazy(() => DeviceUncheckedUpdateManyWithoutLicenseKeyNestedInputSchema).optional()
}).strict();

export const LicenseKeyUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.LicenseKeyUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maxDevices: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issued: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActivated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEnable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LicenseFeatureCreateManyLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureCreateManyLicenseKeyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const DeviceCreateManyLicenseKeyInputSchema: z.ZodType<Prisma.DeviceCreateManyLicenseKeyInput> = z.object({
  id: z.string().optional(),
  deviceHwId: z.string(),
  deviceName: z.string(),
  deviceType: z.string(),
  deviceOS: z.string()
}).strict();

export const LicenseFeatureUpdateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureUpdateWithoutLicenseKeyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LicenseFeatureUncheckedUpdateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureUncheckedUpdateWithoutLicenseKeyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LicenseFeatureUncheckedUpdateManyWithoutLicenseKeyInputSchema: z.ZodType<Prisma.LicenseFeatureUncheckedUpdateManyWithoutLicenseKeyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceUpdateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutLicenseKeyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceHwId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceOS: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceUncheckedUpdateWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutLicenseKeyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceHwId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceOS: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceUncheckedUpdateManyWithoutLicenseKeyInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutLicenseKeyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceHwId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deviceOS: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const LicenseKeyFindFirstArgsSchema: z.ZodType<Prisma.LicenseKeyFindFirstArgs> = z.object({
  select: LicenseKeySelectSchema.optional(),
  include: LicenseKeyIncludeSchema.optional(),
  where: LicenseKeyWhereInputSchema.optional(),
  orderBy: z.union([ LicenseKeyOrderByWithRelationInputSchema.array(),LicenseKeyOrderByWithRelationInputSchema ]).optional(),
  cursor: LicenseKeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LicenseKeyScalarFieldEnumSchema,LicenseKeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LicenseKeyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LicenseKeyFindFirstOrThrowArgs> = z.object({
  select: LicenseKeySelectSchema.optional(),
  include: LicenseKeyIncludeSchema.optional(),
  where: LicenseKeyWhereInputSchema.optional(),
  orderBy: z.union([ LicenseKeyOrderByWithRelationInputSchema.array(),LicenseKeyOrderByWithRelationInputSchema ]).optional(),
  cursor: LicenseKeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LicenseKeyScalarFieldEnumSchema,LicenseKeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LicenseKeyFindManyArgsSchema: z.ZodType<Prisma.LicenseKeyFindManyArgs> = z.object({
  select: LicenseKeySelectSchema.optional(),
  include: LicenseKeyIncludeSchema.optional(),
  where: LicenseKeyWhereInputSchema.optional(),
  orderBy: z.union([ LicenseKeyOrderByWithRelationInputSchema.array(),LicenseKeyOrderByWithRelationInputSchema ]).optional(),
  cursor: LicenseKeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LicenseKeyScalarFieldEnumSchema,LicenseKeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LicenseKeyAggregateArgsSchema: z.ZodType<Prisma.LicenseKeyAggregateArgs> = z.object({
  where: LicenseKeyWhereInputSchema.optional(),
  orderBy: z.union([ LicenseKeyOrderByWithRelationInputSchema.array(),LicenseKeyOrderByWithRelationInputSchema ]).optional(),
  cursor: LicenseKeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LicenseKeyGroupByArgsSchema: z.ZodType<Prisma.LicenseKeyGroupByArgs> = z.object({
  where: LicenseKeyWhereInputSchema.optional(),
  orderBy: z.union([ LicenseKeyOrderByWithAggregationInputSchema.array(),LicenseKeyOrderByWithAggregationInputSchema ]).optional(),
  by: LicenseKeyScalarFieldEnumSchema.array(),
  having: LicenseKeyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LicenseKeyFindUniqueArgsSchema: z.ZodType<Prisma.LicenseKeyFindUniqueArgs> = z.object({
  select: LicenseKeySelectSchema.optional(),
  include: LicenseKeyIncludeSchema.optional(),
  where: LicenseKeyWhereUniqueInputSchema,
}).strict() ;

export const LicenseKeyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LicenseKeyFindUniqueOrThrowArgs> = z.object({
  select: LicenseKeySelectSchema.optional(),
  include: LicenseKeyIncludeSchema.optional(),
  where: LicenseKeyWhereUniqueInputSchema,
}).strict() ;

export const DeviceFindFirstArgsSchema: z.ZodType<Prisma.DeviceFindFirstArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeviceScalarFieldEnumSchema,DeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DeviceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DeviceFindFirstOrThrowArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeviceScalarFieldEnumSchema,DeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DeviceFindManyArgsSchema: z.ZodType<Prisma.DeviceFindManyArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeviceScalarFieldEnumSchema,DeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DeviceAggregateArgsSchema: z.ZodType<Prisma.DeviceAggregateArgs> = z.object({
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DeviceGroupByArgsSchema: z.ZodType<Prisma.DeviceGroupByArgs> = z.object({
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithAggregationInputSchema.array(),DeviceOrderByWithAggregationInputSchema ]).optional(),
  by: DeviceScalarFieldEnumSchema.array(),
  having: DeviceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DeviceFindUniqueArgsSchema: z.ZodType<Prisma.DeviceFindUniqueArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
}).strict() ;

export const DeviceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DeviceFindUniqueOrThrowArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
}).strict() ;

export const LicenseFeatureFindFirstArgsSchema: z.ZodType<Prisma.LicenseFeatureFindFirstArgs> = z.object({
  select: LicenseFeatureSelectSchema.optional(),
  include: LicenseFeatureIncludeSchema.optional(),
  where: LicenseFeatureWhereInputSchema.optional(),
  orderBy: z.union([ LicenseFeatureOrderByWithRelationInputSchema.array(),LicenseFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: LicenseFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LicenseFeatureScalarFieldEnumSchema,LicenseFeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LicenseFeatureFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LicenseFeatureFindFirstOrThrowArgs> = z.object({
  select: LicenseFeatureSelectSchema.optional(),
  include: LicenseFeatureIncludeSchema.optional(),
  where: LicenseFeatureWhereInputSchema.optional(),
  orderBy: z.union([ LicenseFeatureOrderByWithRelationInputSchema.array(),LicenseFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: LicenseFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LicenseFeatureScalarFieldEnumSchema,LicenseFeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LicenseFeatureFindManyArgsSchema: z.ZodType<Prisma.LicenseFeatureFindManyArgs> = z.object({
  select: LicenseFeatureSelectSchema.optional(),
  include: LicenseFeatureIncludeSchema.optional(),
  where: LicenseFeatureWhereInputSchema.optional(),
  orderBy: z.union([ LicenseFeatureOrderByWithRelationInputSchema.array(),LicenseFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: LicenseFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LicenseFeatureScalarFieldEnumSchema,LicenseFeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LicenseFeatureAggregateArgsSchema: z.ZodType<Prisma.LicenseFeatureAggregateArgs> = z.object({
  where: LicenseFeatureWhereInputSchema.optional(),
  orderBy: z.union([ LicenseFeatureOrderByWithRelationInputSchema.array(),LicenseFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: LicenseFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LicenseFeatureGroupByArgsSchema: z.ZodType<Prisma.LicenseFeatureGroupByArgs> = z.object({
  where: LicenseFeatureWhereInputSchema.optional(),
  orderBy: z.union([ LicenseFeatureOrderByWithAggregationInputSchema.array(),LicenseFeatureOrderByWithAggregationInputSchema ]).optional(),
  by: LicenseFeatureScalarFieldEnumSchema.array(),
  having: LicenseFeatureScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LicenseFeatureFindUniqueArgsSchema: z.ZodType<Prisma.LicenseFeatureFindUniqueArgs> = z.object({
  select: LicenseFeatureSelectSchema.optional(),
  include: LicenseFeatureIncludeSchema.optional(),
  where: LicenseFeatureWhereUniqueInputSchema,
}).strict() ;

export const LicenseFeatureFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LicenseFeatureFindUniqueOrThrowArgs> = z.object({
  select: LicenseFeatureSelectSchema.optional(),
  include: LicenseFeatureIncludeSchema.optional(),
  where: LicenseFeatureWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const LicenseKeyCreateArgsSchema: z.ZodType<Prisma.LicenseKeyCreateArgs> = z.object({
  select: LicenseKeySelectSchema.optional(),
  include: LicenseKeyIncludeSchema.optional(),
  data: z.union([ LicenseKeyCreateInputSchema,LicenseKeyUncheckedCreateInputSchema ]),
}).strict() ;

export const LicenseKeyUpsertArgsSchema: z.ZodType<Prisma.LicenseKeyUpsertArgs> = z.object({
  select: LicenseKeySelectSchema.optional(),
  include: LicenseKeyIncludeSchema.optional(),
  where: LicenseKeyWhereUniqueInputSchema,
  create: z.union([ LicenseKeyCreateInputSchema,LicenseKeyUncheckedCreateInputSchema ]),
  update: z.union([ LicenseKeyUpdateInputSchema,LicenseKeyUncheckedUpdateInputSchema ]),
}).strict() ;

export const LicenseKeyCreateManyArgsSchema: z.ZodType<Prisma.LicenseKeyCreateManyArgs> = z.object({
  data: z.union([ LicenseKeyCreateManyInputSchema,LicenseKeyCreateManyInputSchema.array() ]),
}).strict() ;

export const LicenseKeyDeleteArgsSchema: z.ZodType<Prisma.LicenseKeyDeleteArgs> = z.object({
  select: LicenseKeySelectSchema.optional(),
  include: LicenseKeyIncludeSchema.optional(),
  where: LicenseKeyWhereUniqueInputSchema,
}).strict() ;

export const LicenseKeyUpdateArgsSchema: z.ZodType<Prisma.LicenseKeyUpdateArgs> = z.object({
  select: LicenseKeySelectSchema.optional(),
  include: LicenseKeyIncludeSchema.optional(),
  data: z.union([ LicenseKeyUpdateInputSchema,LicenseKeyUncheckedUpdateInputSchema ]),
  where: LicenseKeyWhereUniqueInputSchema,
}).strict() ;

export const LicenseKeyUpdateManyArgsSchema: z.ZodType<Prisma.LicenseKeyUpdateManyArgs> = z.object({
  data: z.union([ LicenseKeyUpdateManyMutationInputSchema,LicenseKeyUncheckedUpdateManyInputSchema ]),
  where: LicenseKeyWhereInputSchema.optional(),
}).strict() ;

export const LicenseKeyDeleteManyArgsSchema: z.ZodType<Prisma.LicenseKeyDeleteManyArgs> = z.object({
  where: LicenseKeyWhereInputSchema.optional(),
}).strict() ;

export const DeviceCreateArgsSchema: z.ZodType<Prisma.DeviceCreateArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  data: z.union([ DeviceCreateInputSchema,DeviceUncheckedCreateInputSchema ]),
}).strict() ;

export const DeviceUpsertArgsSchema: z.ZodType<Prisma.DeviceUpsertArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
  create: z.union([ DeviceCreateInputSchema,DeviceUncheckedCreateInputSchema ]),
  update: z.union([ DeviceUpdateInputSchema,DeviceUncheckedUpdateInputSchema ]),
}).strict() ;

export const DeviceCreateManyArgsSchema: z.ZodType<Prisma.DeviceCreateManyArgs> = z.object({
  data: z.union([ DeviceCreateManyInputSchema,DeviceCreateManyInputSchema.array() ]),
}).strict() ;

export const DeviceDeleteArgsSchema: z.ZodType<Prisma.DeviceDeleteArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
}).strict() ;

export const DeviceUpdateArgsSchema: z.ZodType<Prisma.DeviceUpdateArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  data: z.union([ DeviceUpdateInputSchema,DeviceUncheckedUpdateInputSchema ]),
  where: DeviceWhereUniqueInputSchema,
}).strict() ;

export const DeviceUpdateManyArgsSchema: z.ZodType<Prisma.DeviceUpdateManyArgs> = z.object({
  data: z.union([ DeviceUpdateManyMutationInputSchema,DeviceUncheckedUpdateManyInputSchema ]),
  where: DeviceWhereInputSchema.optional(),
}).strict() ;

export const DeviceDeleteManyArgsSchema: z.ZodType<Prisma.DeviceDeleteManyArgs> = z.object({
  where: DeviceWhereInputSchema.optional(),
}).strict() ;

export const LicenseFeatureCreateArgsSchema: z.ZodType<Prisma.LicenseFeatureCreateArgs> = z.object({
  select: LicenseFeatureSelectSchema.optional(),
  include: LicenseFeatureIncludeSchema.optional(),
  data: z.union([ LicenseFeatureCreateInputSchema,LicenseFeatureUncheckedCreateInputSchema ]),
}).strict() ;

export const LicenseFeatureUpsertArgsSchema: z.ZodType<Prisma.LicenseFeatureUpsertArgs> = z.object({
  select: LicenseFeatureSelectSchema.optional(),
  include: LicenseFeatureIncludeSchema.optional(),
  where: LicenseFeatureWhereUniqueInputSchema,
  create: z.union([ LicenseFeatureCreateInputSchema,LicenseFeatureUncheckedCreateInputSchema ]),
  update: z.union([ LicenseFeatureUpdateInputSchema,LicenseFeatureUncheckedUpdateInputSchema ]),
}).strict() ;

export const LicenseFeatureCreateManyArgsSchema: z.ZodType<Prisma.LicenseFeatureCreateManyArgs> = z.object({
  data: z.union([ LicenseFeatureCreateManyInputSchema,LicenseFeatureCreateManyInputSchema.array() ]),
}).strict() ;

export const LicenseFeatureDeleteArgsSchema: z.ZodType<Prisma.LicenseFeatureDeleteArgs> = z.object({
  select: LicenseFeatureSelectSchema.optional(),
  include: LicenseFeatureIncludeSchema.optional(),
  where: LicenseFeatureWhereUniqueInputSchema,
}).strict() ;

export const LicenseFeatureUpdateArgsSchema: z.ZodType<Prisma.LicenseFeatureUpdateArgs> = z.object({
  select: LicenseFeatureSelectSchema.optional(),
  include: LicenseFeatureIncludeSchema.optional(),
  data: z.union([ LicenseFeatureUpdateInputSchema,LicenseFeatureUncheckedUpdateInputSchema ]),
  where: LicenseFeatureWhereUniqueInputSchema,
}).strict() ;

export const LicenseFeatureUpdateManyArgsSchema: z.ZodType<Prisma.LicenseFeatureUpdateManyArgs> = z.object({
  data: z.union([ LicenseFeatureUpdateManyMutationInputSchema,LicenseFeatureUncheckedUpdateManyInputSchema ]),
  where: LicenseFeatureWhereInputSchema.optional(),
}).strict() ;

export const LicenseFeatureDeleteManyArgsSchema: z.ZodType<Prisma.LicenseFeatureDeleteManyArgs> = z.object({
  where: LicenseFeatureWhereInputSchema.optional(),
}).strict() ;