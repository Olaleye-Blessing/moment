import FormText from "../Form/FormText";

const EditAboutFormContent = ({ changedProfile, onChange }) => {
    return (
        <>
            <section className="pt-8">
                <FormText
                    name="work"
                    value={changedProfile.work}
                    handleChange={onChange}
                    placeholder={`${"your current work"}`}
                />
                <FormText
                    name="education"
                    value={changedProfile.education}
                    handleChange={onChange}
                    placeholder={`${"your last/current institution"}`}
                />
                <FormText
                    name="lives"
                    label="current city"
                    value={changedProfile.lives}
                    handleChange={onChange}
                    placeholder={`${"city you are currently in"}`}
                />
                <FormText
                    name="hometown"
                    value={changedProfile.hometown}
                    handleChange={onChange}
                    placeholder={`${"your hometown"}`}
                />
            </section>
            <section className="">
                <header className="">
                    <h3 className="mb-4">Social Links</h3>
                </header>
                <FormText
                    name="twitter"
                    value={changedProfile.twitter}
                    label="twitter"
                    handleChange={onChange}
                    placeholder={`${"your twitter handle without '@'"}`}
                />
                <FormText
                    name="instagram"
                    value={changedProfile.instagram}
                    label="instagram"
                    handleChange={onChange}
                    placeholder={`${"your instagram handle without '@'"}`}
                />
                <FormText
                    name="github"
                    value={changedProfile.github}
                    label="github"
                    handleChange={onChange}
                    placeholder={`${"your github username without '@'"}`}
                />
                <FormText
                    name="linkedin"
                    value={changedProfile.linkedin}
                    label="linkedin"
                    handleChange={onChange}
                    placeholder={`${"your linkedin username without '@'"}`}
                />
            </section>
        </>
    );
};

export default EditAboutFormContent;
