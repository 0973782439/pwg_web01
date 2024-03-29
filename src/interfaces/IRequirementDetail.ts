export interface IRequirementDetail{
        requirementId: number
        requirementTitle: string,
        requirementDescription: number,
        requirementWorkflow: string,
        requirementOwner: number,
        requirementOwnerName: string,
        requirementBusinessImportance: number,
        requirementBusinessImportanceStr: string
        requirementIsoclassification: 0,
        requirementIsoclassificationStr: null | string | number,
        requirementIsosubClassification: 0,
        requirementIsosubClassificationStr: null | string | number,
        assignedTo: string,
        requirementAssignedOn:string,
        createdBy: string,
        requirementCreatedOn: string,
        approvedBy: string,
        requirementApprovedOn:string,
        deprecatedBy: string,
        requirementDeprecatedOn:string,
        requirementDeprecatingReason: 211,
        modified: string,
        modifiedOn: string,
        requirementDeletedBy: null | string | number,
        requirementDeleted: string | string | number,
        requirementDeletedOn: null | string | number,
        requirementEffectiveFromDate: null,
        requirementEffectiveFromVersion: null | string | number,
        requirementEffectiveToDate: null | string | number,
        requirementEffectiveToVersion: null | string | number,
        requirementType: 1111100,
        requirementTypeStr: string,
        testCoverageFlag: null | string | number,
        requirementExternalReference: null | string | number,
        requirementVersion: 1.00,
        requirementComments: string,
        logicalDelete: 0,
        deletionReason: null | string | number
}