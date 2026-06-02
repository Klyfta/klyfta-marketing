import type { ArticleMeta } from "./types";

export const meta: ArticleMeta = {
  slug: "us-cloud-act-eu-businesses",
  title:
    "What the US CLOUD Act actually means for European businesses",
  description:
    "Why even AWS, Google Cloud, and Azure EU regions don't put you outside the reach of US authorities — and what genuine sovereignty requires.",
  publishedAt: "2026-05-18",
  lastModified: "2026-05-18",
  readingMinutes: 9,
  tags: ["sovereignty", "cloud-act", "procurement"],
};

export default function Article() {
  return (
    <>
      <p>
        Almost every European business now runs on US-headquartered cloud
        services. Mail goes through Google Workspace or Microsoft 365. Files
        live on Google Drive, OneDrive, or Dropbox. Customer data passes
        through Stripe, HubSpot, or Salesforce. The default assumption — when
        anyone bothers to think about it — is that storing the data in an
        &quot;EU region&quot; means it stays under EU law.
      </p>

      <p>
        That assumption is wrong, and the law that makes it wrong is the US
        CLOUD Act. It&apos;s worth understanding precisely, because the
        consequences are concrete: a procurement team that signs off on
        &quot;the data is in <code>eu-central-1</code>&quot; without
        understanding the corporate-domicile question has signed off on
        something they probably didn&apos;t mean to.
      </p>

      <h2>How the CLOUD Act actually works</h2>

      <p>
        The Clarifying Lawful Overseas Use of Data Act was passed by the US
        Congress in 2018. It does two things relevant here. First, it lets US
        federal authorities compel a US-incorporated company to produce data
        in its &quot;possession, custody, or control&quot;, regardless of
        where in the world that data is physically stored. Second, it lets
        the US Department of Justice enter bilateral agreements with foreign
        governments to streamline mutual access.
      </p>

      <p>
        The phrase that matters is <strong>possession, custody, or control</strong>.
        It&apos;s not a location test. It&apos;s a corporate-relationship
        test. If the entity that holds your data is a US corporation, or a
        subsidiary of one, or under the &quot;control&quot; of one as a
        matter of US legal interpretation, the CLOUD Act applies. The data
        could be on a hard drive in Frankfurt, Stockholm, or Reykjavik. The
        location is not the question. The corporate structure is.
      </p>

      <p>
        This is not a theoretical reading. US courts have already enforced
        CLOUD Act production orders against US tech companies for data
        stored on EU soil. The case law is settled. The mechanism works.
      </p>

      <h2>&quot;But my data is in <code>eu-central-1</code>&quot; doesn&apos;t help</h2>

      <p>
        The most common mistake in procurement reviews is treating
        cloud-provider &quot;EU regions&quot; as a sufficient safeguard.
        They aren&apos;t — not because the providers are dishonest about
        where the data physically sits (they aren&apos;t), but because the
        legal test is corporate, not geographic.
      </p>

      <ul>
        <li>
          <strong>AWS Frankfurt</strong> (<code>eu-central-1</code>) is
          operated by Amazon Web Services EMEA SARL, a Luxembourg entity
          that is a subsidiary of Amazon.com, Inc. — a US corporation. The
          parent retains the corporate control the CLOUD Act looks for.
        </li>
        <li>
          <strong>Google Cloud Belgium</strong> (<code>europe-west1</code>)
          is operated by Google Cloud EMEA Limited, an Irish entity that is
          a subsidiary of Alphabet Inc. — also US. Same structure.
        </li>
        <li>
          <strong>Azure Sweden Central</strong> is operated by Microsoft
          Ireland Operations Limited, a subsidiary of Microsoft Corporation
          — also US. Same structure again.
        </li>
      </ul>

      <p>
        Each of these EU regions is a real data centre in a real EU country.
        The packets really do route there. The disks really are inside the
        Schengen zone. None of that protects the data from being produced
        under a US CLOUD Act order served on the parent company in Seattle,
        Mountain View, or Redmond.
      </p>

      <p>
        Google&apos;s and Microsoft&apos;s own transparency reports
        acknowledge this directly. Both companies disclose receiving and
        responding to US government data requests for customer data,
        including customer data stored in EU regions. The numbers are
        published. The mechanism is not in dispute.
      </p>

      <h2>What CLOUD Act exposure looks like in practice</h2>

      <p>
        The honest answer is: most of the time, nothing. The vast majority
        of European businesses are not the target of US federal
        investigations. The CLOUD Act risk for a Berlin design studio
        running Google Workspace is, in practice, vanishingly small. This
        is why the issue is so often dismissed as theoretical.
      </p>

      <p>
        It is also why it tends to be taken seriously only in three
        contexts, and dismissed everywhere else:
      </p>

      <ol>
        <li>
          <strong>Regulated industries.</strong> Financial services, health,
          legal — anywhere a national regulator has a position on
          third-country data access. Increasingly the answer from EU
          regulators is &quot;avoid CLOUD Act-exposed providers for
          regulated workloads.&quot;
        </li>
        <li>
          <strong>Public sector procurement.</strong> National and EU-level
          tenders increasingly require &quot;sovereign cloud&quot; or
          &quot;no third-country data access risk&quot; clauses. The CLOUD
          Act is the third-country risk.
        </li>
        <li>
          <strong>Cross-border legal exposure.</strong> Companies operating
          in jurisdictions where the EU-US Data Privacy Framework is being
          tested, or where Schrems-style invalidation case law is pending.
          Some legal opinions advise hedging through provider choice now,
          rather than during the next ruling.
        </li>
      </ol>

      <p>
        Outside those three contexts, the typical conversation is: &quot;is
        this likely to affect us? Probably not. Should we still pick a
        non-exposed provider when one is available? If the price and product
        are comparable, yes.&quot; That &quot;yes&quot; is the procurement
        wedge that&apos;s reshaping EU SaaS.
      </p>

      <h2>What actually puts you outside CLOUD Act reach</h2>

      <p>
        Three conditions, all of which must hold:
      </p>

      <ol>
        <li>
          <strong>The data controller has no US corporate presence.</strong>{" "}
          No US parent, no US subsidiary, no US-incorporated entity that
          holds the data. A Swedish, German, or French company with
          operations only in the EU.
        </li>
        <li>
          <strong>The infrastructure is not operated by a US-parented
          company.</strong> Not AWS-Frankfurt, not Google-Belgium, not
          Azure-Sweden. The provider running the workload must be EU-owned
          end-to-end. Examples: Hetzner (DE), OVH (FR), Scaleway (FR),
          IONOS (DE), Open Telekom Cloud (DE), UpCloud (FI), a sovereign
          cloud partnership.
        </li>
        <li>
          <strong>Sub-processors in the data path are also non-US.</strong>{" "}
          This is the part most &quot;EU-hosted&quot; competitors fail. The
          mail server can be in an EU cloud in Frankfurt and still pipe
          transactional email through Sendgrid (US), payments through
          Stripe-US, customer support tickets through Intercom (US), edge
          caching through Cloudflare (US). Each one is a CLOUD Act
          re-entry. Authentic sovereignty requires the whole chain.
        </li>
      </ol>

      <p>
        These conditions are concrete and testable. Ask a vendor: who owns
        the company? Where is each subprocessor incorporated? Is the
        subprocessor list published? Will you be notified when it changes?
        The answers should not require legal interpretation. They should be
        a list.
      </p>

      <h2>A procurement checklist</h2>

      <p>
        Five questions to ask any SaaS vendor when CLOUD Act exposure is on
        the table. None of these are difficult; the difficulty is that
        vendors often haven&apos;t prepared the answers.
      </p>

      <ol>
        <li>
          <strong>Where is your company incorporated, and is there any
          US-incorporated entity in your corporate structure?</strong> If
          the answer involves &quot;our US holding company&quot; or
          &quot;our Delaware parent&quot;, that&apos;s the answer.
        </li>
        <li>
          <strong>Who operates the infrastructure where customer data
          lives?</strong> If the answer is AWS, GCP, or Azure — including
          their EU regions — that&apos;s the answer.
        </li>
        <li>
          <strong>Can I have the current subprocessor list, and will
          changes be notified in advance?</strong> A vendor that can&apos;t
          produce this on demand has not done the work.
        </li>
        <li>
          <strong>Are encryption keys managed by you on EU-owned
          infrastructure, or by a US-owned KMS service?</strong> AWS KMS,
          GCP KMS, and Azure Key Vault are US-owned. EU-sovereign KMS
          options exist.
        </li>
        <li>
          <strong>What happens when a US legal order reaches you?</strong>{" "}
          The honest answer for a US-incorporated vendor is &quot;we comply
          with valid orders.&quot; The honest answer for a clean EU
          structure is &quot;US orders are processed through Swedish/EU
          legal channels, not direct compulsion.&quot;
        </li>
      </ol>

      <h2>How Verkio addresses this</h2>

      <p>
        Verkio is a European company with no US presence in the corporate
        structure or the data path. Infrastructure runs on EU-owned
        providers; encryption keys live in an EU-located KMS we operate;
        the subprocessor list is published with changes announced ahead of
        time. The full posture is summarised on the residency section of
        the homepage — including the explicit &quot;no US subprocessors in
        the data path&quot; commitment, which is the part most
        &quot;EU-hosted&quot; competitors don&apos;t make.
      </p>

      <p>
        This isn&apos;t marketing positioning bolted onto a generic SaaS;
        it&apos;s a structural choice that constrains every vendor decision
        we make. The point of writing it down is to make the constraint
        visible, so procurement reviewers don&apos;t have to reverse-engineer
        it from a privacy policy.
      </p>

      <h2>Further reading</h2>

      <ul>
        <li>
          The full text of the CLOUD Act is at{" "}
          <a
            href="https://www.justice.gov/dag/page/file/1153446/dl"
            target="_blank"
            rel="noopener noreferrer"
          >
            justice.gov
          </a>
          .
        </li>
        <li>
          The European Data Protection Board has published guidance on
          third-country data access at{" "}
          <a
            href="https://www.edpb.europa.eu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            edpb.europa.eu
          </a>
          .
        </li>
        <li>
          NOYB (None of Your Business) tracks ongoing transatlantic data
          transfer cases at{" "}
          <a
            href="https://noyb.eu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            noyb.eu
          </a>
          .
        </li>
      </ul>
    </>
  );
}
