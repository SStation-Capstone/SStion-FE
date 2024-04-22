import { PackageHistoryData } from '@/api/services/admin/packageHistoryService';

export function groupByPackageIdAndSort(arr: PackageHistoryData[] | undefined) {
  const grouped = {} as any;

  arr?.forEach((obj) => {
    if (!grouped[obj.packageId]) {
      grouped[obj.packageId] = {
        name: obj.name,
        description: obj.description,
        status: obj.status,
        packageId: obj.packageId,
        id: obj.id,
        createdBy: obj.createdBy,
        createdAt: obj.createdAt,
        modifiedBy: obj.modifiedBy,
        modifiedAt: obj.modifiedAt,
        deletedBy: obj.deletedBy,
        deletedAt: obj.deletedAt,
        children: [],
      };
    }
    grouped[obj.packageId].children.push(obj);
    // Sort children array by createdAt
    grouped[obj.packageId].children.sort(
      (a: PackageHistoryData, b: PackageHistoryData) =>
        new Date(a.createdAt) - new Date(b.createdAt),
    );
  });
  return Object.values(grouped);
}
