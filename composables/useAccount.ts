import moment from "moment-timezone";

export const useAccount = () => {
  const { t } = useI18n();
  const accountFields = [
    {
      name: "name",
      label: t("account.name"),
      required: true,
      event: true,
    },
    {
      name: "email",
      label: t("account.email"),
      register: true,
      required: true,
      event: true,
    },
    {
      name: "phone",
      label: t("account.phone"),
      register: false,
      required: true,
      event: true,
    },
    {
      name: "password",
      type: "password",
      label: t("account.password"),
      register: true,
      required: true,
    },
    {
      name: "zone",
      label: t("account.zone"),
      component: "TRichSelect",
      options: moment.tz.names(),
    },
    {
      name: "emailConsent",
      label: t("account.emailConsent"),
      component: "TCheckbox",
      register: true,
      hideLabel: true,
      validate(value) {
        return value;
      },
      validationError: t("account.emailConsentError"),
    },
  ];

  return { accountFields };
};
