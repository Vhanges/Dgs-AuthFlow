const TermsAndCondition = () => {
  return (
    <div className="overflow-y-auto h-160 w-full flex flex-col py-10 px-20 gap-4">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-3xl font-bold text-primary">Terms And Condition</h1>
        <div className="flex flex-col">
          <p className="text-xs">Effective Date: February 20, 2026</p>
          <p className="text-xs">Last Updated: February 20, 2026</p>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-primary">
          1. Acceptance of Terms
        </h3>

        <div>
          <p className="pb-5">
            By accessing or using our services, website, or application
            (collectively, the "Service"), you agree to be bound by these Terms
            and Conditions ("Terms"). If you do not agree to these Terms, please
            do not use our Service. These Terms constitute a legally binding
            agreement between you and the Company.
          </p>
          <p>
            We reserve the right to update or modify these Terms at any time.
            Continued use of the Service after any changes constitutes your
            acceptance of the new Terms. We will notify users of material
            changes via email or prominent notice on our platform.
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-primary">2. Eligibility</h3>

        <div>
          <p className="pb-5">To use our Service, you must:</p>
          <ul>
            <li>
              Be at least 18 years of age, or the age of majority in your
              jurisdiction
            </li>
            <li>Have the legal capacity to enter into a binding agreement </li>
            <li>
              Not be prohibited from using the Service under any applicable law
            </li>
            <li>
              Provide accurate, complete, and current information during
              registration
            </li>
          </ul>
          <p>
            By using the Service, you represent and warrant that you meet all
            eligibility requirements.
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-primary">
          3. Account Registration
        </h3>

        <div>
          <p className="pb-5">
            To use our Service, you must:To access certain features of our
            Service, you may be required to create an account. When creating an
            account, you agree to:.
          </p>
          <ul>
            <li>
              Provide truthful, accurate, and complete registration information
            </li>
            <li>Keep your account credentials confidential and secure </li>
            <li>
              Notify us immediately of any unauthorized access to your account
            </li>
            <li>
              Be responsible for all activities that occur under your account
            </li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that contain
            inaccurate information or that we believe have been compromised.
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-primary">
          4. Privacy Policy
        </h3>

        <div>
          <p className="pb-5">
            Your use of the Service is also governed by our Privacy Policy,
            which is incorporated into these Terms by reference. Our Privacy
            Policy explains how we collect, use, store, and protect your
            personal information. By using the Service, you consent to the
            practices described in our Privacy Policy.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary">
          5. Account Deletion and Data Removal
        </h3>

        <div>
          <p className="pb-5">
            You have the right to delete your account at any time. This section
            explains the process, effects, and implications of account deletion.
          </p>
        </div>

        <div>
          <h4 className="text-md font-medium text-primary">
            5.1 What Happens When You Delete Your Account{" "}
          </h4>
          <p>Upon permanent deletion of your account: </p>
          <ul>
            <li>
              Your profile, username, and public-facing information will be
              removed from the Service.
            </li>
            <li>
              You will lose access to all content, data, settings, and history
              associated with your account.
            </li>
            <li>
              Any active subscriptions will be cancelled immediately; no refunds
              will be issued for unused subscription periods.
            </li>
            <li>
              Your personal data will be deleted from our active systems within
              30 days of confirmed deletion.
            </li>
            <li>
              Backup copies of your data may be retained for up to 90 days in
              accordance with our data retention policies before being
              permanently purged.
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-medium text-primary">
            5.2 Effect on Shared or Public Content{" "}
          </h4>
          <p>
            Content you have posted publicly or shared with other users may
            remain visible in certain contexts even after account deletion — for
            example, comments within community discussions or collaborative
            documents. Where technically feasible, we will anonymize or remove
            your identifying information from such content.
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-primary">6. Contact Us </h3>

        <div>
          <p className="pb-5">
            If you have any questions, concerns, or requests regarding these
            Terms and Conditions — including account deletion requests — please
            contact us:
          </p>
          <p>Email: legal@example.com </p>
          <p>Support: support@example.com </p>
          <p>Mailing Address: 123 Company Street, City, State, ZIP, Country </p>
          <p>Help Center: https://support.example.com </p>
        </div>
      </div>

      <div className="flex justify-center items-center p-1 border-t border-gray-300 mt-15">
        <p className="text-gray-400 text-xs">
          By using our Service, you acknowledge that you have read, understood,
          and agree to be bound by these Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndCondition;
