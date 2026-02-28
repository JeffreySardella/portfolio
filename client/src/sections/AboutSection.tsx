const skills = [
  { category: 'Languages', items: ['C#', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML/CSS'] },
  { category: 'Frameworks', items: ['ASP.NET Core', 'React', 'Entity Framework', 'Bootstrap', 'Tailwind', 'Flutter'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Azure', 'SQL Server', 'Visual Studio', 'VS Code'] },
  { category: 'Practices', items: ['REST APIs', 'MVC', 'Agile/Scrum', 'CI/CD', 'Responsive Design', 'Testing'] },
]

function AboutSection() {
  return (
    <section id="about" className="py-8 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* About text - spans 2 cols */}
        <div className="bento-card md:col-span-2 p-8">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-4">About me</p>
          <h2 className="text-2xl font-bold mb-4">
            I build things for the web<span className="text-primary">.</span>
          </h2>
          <div className="space-y-3 text-text-muted leading-relaxed">
            <p>
              I'm a recent Computer Science graduate from Sacramento State where I completed
              my senior capstone building real-world software with a team using Agile methodology.
            </p>
            <p>
              My capstone project was a multi-tier healthcare application — ASP.NET Core backend,
              SQL Server database, Flutter mobile app. I got hands-on with every layer of the stack
              from database design to API development to mobile UI.
            </p>
            <p>
              Looking for a full-stack or backend role where I can work on meaningful products
              and keep growing. Especially into .NET and React stacks.
            </p>
          </div>
        </div>

        {/* Quick stats card */}
        <div className="bento-card p-6 flex flex-col justify-between">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-4">Quick stats</p>
          <div className="space-y-5">
            <div>
              <div className="text-3xl font-bold">3+</div>
              <div className="text-sm text-text-muted">Projects shipped</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm text-text-muted">Technologies used</div>
            </div>
            <div>
              <div className="text-3xl font-bold">B.S.</div>
              <div className="text-sm text-text-muted">Computer Science</div>
            </div>
          </div>
        </div>

        {/* Skills grid - full width */}
        {skills.map((group) => (
          <div key={group.category} className="bento-card p-6">
            <p className="text-xs text-text-muted uppercase tracking-widest mb-3">{group.category}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-bg rounded-lg text-sm font-medium text-text hover:bg-bg-dark transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutSection
