const mapping: Record<string, string> = {
  guests: 'guest',
  'healthcare-providers': 'healthcare_provider',
  'insurance-providers': 'insurance_provider',
  'medical-staffs': 'medical_staff',
  'new-tables': 'new_table',
  'new-table-wcwqs': 'new_table_wcwq',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
