export default function ProblemDescription({ problem }) {
    return (
      <div className="overflow-hidden max-w-full"> {/* Added overflow-hidden and max-w-full */}
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-4">{problem.title}</h1>
        <div className="text-sm md:text-base text-white overflow-auto" dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
      </div>
    );
  }
  